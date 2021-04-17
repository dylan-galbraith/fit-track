const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all routines
router.get('/all/:userId', async (req, res) => {
  const result = await prisma.routine.findMany({
    where: {
      userId: req.params.userId
    },
    select: {
      name: true,
      id: true,
      exercise: {
        select: {
          name: true,
          record: {
            orderBy: {
              date: 'desc'
            }
          },
          id: true
        }
      }
    }
  });
  res.json(result);
})

// Add a new routine
router.post('/all/:userId', async (req, res) => {
  const result = await prisma.routine.create({
    data: {
      name: req.body.name,
      userId: req.params.userId
    }
  });
  res.json(result);
})

// Delete an exercise from a routine
router.put('/:routineId/remove/:exerciseId', async (req, res) => {
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
router.delete('/:routineId', async (req, res) => {
  const result = await prisma.routine.delete({
    where: {
      id: parseInt(req.params.routineId)
    }
  });
  res.json(result);
})

module.exports = router;