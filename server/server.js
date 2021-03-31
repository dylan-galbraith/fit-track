const express = require('express');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const routineRoutes = require('./routes/routines');
const recordRoutes = require('./routes/records');
const jwt = require('jsonwebtoken');
const { prisma } = require('@prisma/client');
require('dotenv').config();

const PORT = 8070;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/exercises', exerciseRoutes);
app.use('/routines', routineRoutes);
app.use('/records', recordRoutes);



const JWT_KEY = process.env.JWT_KEY;


users = {
    username: "dylan",
    password: "test",
    id: 00001
  }


app.get('/login', (req, res) => {
  res.send({token: 'test123'});
})

app.post('/login' , (req, res) => {
  const { username, password } = req.body
  // const result = await prisma.users

  const user = {name: users.username, id: users.id}
  if (password === users.password) {
    const payload = {name: username};
    const token = jwt.sign(payload, JWT_KEY)
    res.status(200).json({token, user})
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})