const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { PrismaClient } = require('@prisma/client');
const { runInNewContext } = require("vm");

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const result = await prisma.record.create({
    data: {
      exercise: {
        connect: {
          id: parseInt(req.body.exerciseId)
        }
      },
      weight: `${req.body.weight} lbs`,
      reps: req.body.reps
    }
  })
  res.json(result)
})

module.exports = router;