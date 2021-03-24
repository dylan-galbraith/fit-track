const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const result = await prisma.exercise.findMany()
  res.json(result);
})

router.post('/', async (req, res) => {
  const result = await prisma.exercise.create({
    data: {
      name: req.body.name,
    },
  })
  res.json(result)
})

module.exports = router;