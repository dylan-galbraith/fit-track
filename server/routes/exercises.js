const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { PrismaClient } = require('@prisma/client');
const { DESTRUCTION } = require("dns");

const prisma = new PrismaClient();

// Get all exercises
router.get('/all/:userId', async (req, res) => {
  const result = await prisma.exercise.findMany({
    where: {
      userId: parseInt(req.params.userId)
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
      user: {
        connect: {
          id: parseInt(req.params.userId)
        }
      }
    },
  })
  res.json(result)
})

// Get a specific exercise
router.get('/:exerciseId', async (req, res) => {
  const result = await prisma.exercise.findUnique({
    where: {
      id: parseInt(req.params.exerciseId)
    },
    select: {
      name: true,
      favourite: true,
      id: true,
      user: {
        select: {
          id: true
        }
      },
      record: {
        orderBy: {
          date: 'desc'
        },
        select: {
          date: true,
          weight: true,
          reps: true,
          id: true
        }
      }
    }
  })
  res.json(result)
})

// Add an exercise to a routine
router.put('/:exerciseId/add/:routineId/:userId', async (req, res) => {
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
router.put('/:exerciseId/favourite/:userId', async (req, res) => {
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
router.delete('/:exerciseId/:userId', async (req, res) => {
  const result = await prisma.exercise.delete({
    where: {
      id: parseInt(req.params.exerciseId)
    }
  })
  res.json(result)
})

module.exports = router;