const express = require('express');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const routineRoutes = require('./routes/routines');
const recordRoutes = require('./routes/records');
const userRoutes = require('./routes/users');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

app.use('/exercises', exerciseRoutes);
app.use('/routines', routineRoutes);
app.use('/records', recordRoutes);
app.use('/', userRoutes);

let connection;

console.log(process.env.PORT);

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  })
}



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

connection.connect(err => {
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;