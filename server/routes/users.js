const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_KEY = process.env.JWT_KEY;

router.post('/login' , async (req, res) => {
  console.log(userId);
  const { username, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })
  if (password === user.password) {
    const payload = {name: username};
    const token = jwt.sign(payload, JWT_KEY)
    res.status(200).json({token, user})
  }
  res.status(403).json({message: "invalid username or password"})
})

router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password
    }
  })
  res.status(200).json({newUser})
})

module.exports = router;