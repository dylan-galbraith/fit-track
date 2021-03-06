const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all exercises
router.get('/all/:userId', async (req, res) => {
  const result = await prisma.exercise.findMany({
    where: {
      userId: req.params.userId
    },
    select: {
      name: true,
      id: true,
      favourite: true,
      record: {
        orderBy: {
          date: 'desc'
        },
        select: {
          date: true,
          weight: true,
          reps: true,
          id: true,
          note: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
  res.json(result);
})

// Add a new exercise
router.post('/all/:userId', async (req, res) => {
  const result = await prisma.exercise.create({
    data: {
      name: req.body.name,
      userId: req.params.userId
    }
  })
  res.json(result)
})

// Add an exercise to a routine
router.put('/:exerciseId/add/:routineId', async (req, res) => {
  const result = await prisma.exercise.update({
    where: {
      id: parseInt(req.params.exerciseId)
    },
    data: {
      routine: {
        connect: {
          id: parseInt(req.params.routineId)
        }
      }
    }
  })
  res.json(result)
})

// Favourite an exercise
router.put('/:exerciseId/favourite', async (req, res) => {
  const result = await prisma.exercise.update({
    where: {
      id: parseInt(req.params.exerciseId)
    },
    data: {
      favourite: req.body.favourite
    }
  })
  res.json(result)
})

// Delete an exercise
router.delete('/:exerciseId', async (req, res) => {
  const result = await prisma.exercise.delete({
    where: {
      id: parseInt(req.params.exerciseId)
    }
  })
  res.json(result)
})

module.exports = router;