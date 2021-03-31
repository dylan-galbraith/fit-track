const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_KEY = process.env.JWT_KEY;


users = {
    username: "dylan",
    password: "test",
    id: 00001
  }


router.get('/', (req, res) => {
  res.send({token: 'test123'});
})

router.post('/' , async (req, res) => {
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
})

module.exports = router;