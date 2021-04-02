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
  const decoded = jwt.verify(token, JWT_KEY);
  const user = await prisma.user.findUnique({
    where: {
      username: decoded.name
    },
    select: {
      id: true,
      firstName: true,
      password: true,
      exercise: {
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

function authorize(req, res, next) {
  // STEP 2: Logic for getting the token and
  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point.
  console.log(req.headers.authorization);
  const tokenString = req.headers.authorization;
  const token = tokenString ? tokenString.split(' ')[1] : '';
  if (token.length > 0) {
    jwt.verify(token, JWT_KEY, (err, decodedData) => {
      if(err) {
        res.status(403).json({message: 'Token invalid or expired'});
      } else {
        req.decoded = decodedData;
        next();
      }
    })
  }
  else {
    res.status(403).json({message: 'Not authorized to access this.'});
  }
}


module.exports = router;