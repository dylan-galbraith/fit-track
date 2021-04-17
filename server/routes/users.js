const { Router } = require("express");
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ADMIN_KEY = `${process.env.ADMIN_KEY}`;

router.get('/', (req, res) => {
  res.send("hi")
})

router.put(`/admin/${ADMIN_KEY}`, async (req, res) => {
  const allRoutines = await prisma.routine.updateMany({
    where: {
      userId: "8"
    },
    data: {
      userId: "kRQXDz3mrdb7iu7DrLzfAIqfer82"
    }
  })
  res.json(allRoutines)
})

module.exports = router;