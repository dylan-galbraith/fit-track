const express = require('express');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const routineRoutes = require('./routes/routines');
const recordRoutes = require('./routes/records');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/exercises', exerciseRoutes);
app.use('/routines', routineRoutes);
app.use('/records', recordRoutes);
app.use('/', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})