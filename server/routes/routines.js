const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all routines
router.get('/', async (req, res) => {
  const result = await prisma.routine.findMany();
  res.json(result);
})

// Add a new routine
router.post('/', async (req, res) => {
  const result = await prisma.routine.create({
    data: {
      name: req.body.name
    }
  });
  res.json(result);
})

// Get a specific routine
router.get('/:routineId', async (req, res) => {
  const result = await prisma.routine.findUnique({
    where: {
      id: parseInt(req.params.routineId)
    },
    select: {
      name: true,
      exercise: {
        select: {
          name: true
        }
      }
    }
  });
  res.json(result)
})

// Delete a routine
router.delete('/:routineId', async (req, res) => {
  const result = await prisma.routine.delete({
    where: {
      id: parseInt(req.params.routineId)
    }
  });
  res.json(result);
})

module.exports = router;