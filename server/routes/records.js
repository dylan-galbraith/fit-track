const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/:userId', async (req, res) => {
  const result = await prisma.record.create({
    data: {
      exercise: {
        connect: {
          id: parseInt(req.body.exerciseId)
        }
      },
      user: {
        connect: {
          id: parseInt(req.params.userId)
        }
      },
      weight: `${req.body.weight} lbs`,
      reps: req.body.reps,
      note: req.body.note
    }
  })
  res.json(result)
})

router.delete('/:recordId/:userId', async (req, res) => {
  const result = await prisma.record.delete({
    where: {
      id: parseInt(req.params.recordId)
    }
  })
  res.json(result);
})

module.exports = router;