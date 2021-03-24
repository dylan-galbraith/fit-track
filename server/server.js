const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');

const PORT = 8070;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const result = await prisma.exercise.create({
    data: {
      name: req.body.name,
    },
  })
  res.json(result)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})