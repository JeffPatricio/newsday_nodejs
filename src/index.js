const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3001, () => console.log(`Server running in port ${process.env.PORT || 3001}`));
