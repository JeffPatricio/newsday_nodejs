const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync(path.resolve(__dirname, "..", "uploads"))) {
  fs.mkdirSync(path.resolve(__dirname, "..", "uploads"));
}

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(3001, () => {
  console.log(`Server running in port 3001`)
});
