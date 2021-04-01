const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all routines
router.get('/all/:userId', async (req, res) => {
  const result = await prisma.routine.findMany({
    where: {
      userId: parseInt(req.params.userId)
    }
  });
  res.json(result);
})

// Add a new routine
router.post('/all/:userId', async (req, res) => {
  const result = await prisma.routine.create({
    data: {
      name: req.body.name,
      user: {
        connect: {
          id: parseInt(req.params.userId)
        }
      }
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
      user: {
        select: {
          id: true
        }
      },
      exercise: {
        select: {
          name: true,
          record: true,
          id: true
        }
      }
    }
  });
  res.json(result)
})

// Delete an exercise from a routine
router.put('/:routineId/remove/:exerciseId/:userId', async (req, res) => {
  const result = await prisma.routine.update({
    where: {
      id: parseInt(req.params.routineId)
    },
    data: {
      exercise: {
        disconnect: {
          id: parseInt(req.params.exerciseId)
        }
      }
    }
  })
  res.json(result)
})

// Delete a routine
router.delete('/:routineId/:userId', async (req, res) => {
  const result = await prisma.routine.delete({
    where: {
      id: parseInt(req.params.routineId)
    }
  });
  res.json(result);
})

module.exports = router;