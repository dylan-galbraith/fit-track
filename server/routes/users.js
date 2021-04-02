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
    const payload = {name: username};
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

module.exports = router;