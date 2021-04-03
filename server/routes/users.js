const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_KEY = process.env.JWT_KEY;

router.post('/login' , async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      username: username
    },
    select: {
      id: true,
      firstName: true,
      password: true,
      exercise: {
        orderBy: {
          name: 'asc'
        },
        select: {
          id: true,
          name: true,
          favourite: true,
          record: {
            select: {
              id: true,
              date: true,
              weight: true,
              reps: true
            }
          }
        }
      },
      routine: {
        select: {
          id: true,
          name: true,
          exercise: {
            select: {
              id: true,              
            }
          }
        }
      }
    }
  })
  if (user && bcrypt.compareSync(password, user.password)) {
    const payload = {name: username, exp: Math.floor(Date.now() / 1000) + (60 * 60)};
    const token = jwt.sign(payload, JWT_KEY)
    res.status(200).json({token, user})
  } else {
    res.status(403).json({message: "invalid username or password"})
  }
})

router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
  const newUser = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hash
    }
  })
  res.status(200).json({newUser})
})

router.get('/profile', async (req, res) => {
  const tokenString = req.headers.authorization;
  const token = tokenString ? tokenString.split(' ')[1] : '';
  const decoded = jwt.verify(token, JWT_KEY, function(err, decoded) {
    if (err) {
      res.status(403).json({message: "Session Expired"})
    } else {
      return decoded
    }
  });
  const user = await prisma.user.findUnique({
    where: {
      username: decoded.name
    },
    select: {
      id: true,
      firstName: true,
      password: true,
      exercise: {
        orderBy: {
          name: 'asc'
        },
        select: {
          id: true,
          name: true,
          favourite: true,
          record: {
            select: {
              id: true,
              date: true,
              weight: true,
              reps: true
            }
          }
        }
      },
      routine: {
        select: {
          id: true,
          name: true,
          exercise: {
            select: {
              id: true,              
            }
          }
        }
      }
    }
  })
  res.status(200).json(user)
})


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;