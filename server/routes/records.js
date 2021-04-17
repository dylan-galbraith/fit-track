const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
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
      reps: req.body.reps,
      note: req.body.note
    }
  })
  res.json(result)
})

router.delete('/:recordId', async (req, res) => {
  const result = await prisma.record.delete({
    where: {
      id: parseInt(req.params.recordId)
    }
  })
  res.json(result);
})

module.exports = router;