const express = require('express');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const routineRoutes = require('./routes/routines');

const PORT = 8070;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/exercises', exerciseRoutes);
app.use('/routines', routineRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})