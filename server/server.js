const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises')

const PORT = 8070;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/exercises', exerciseRoutes);

// app.get('/exercises', async (req, res) => {
//   const result = await prisma.exercise.findMany()
//   res.json(result);
// })

// app.post('/exercises', async (req, res) => {
//   const result = await prisma.exercise.create({
//     data: {
//       name: req.body.name,
//     },
//   })
//   res.json(result)
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})