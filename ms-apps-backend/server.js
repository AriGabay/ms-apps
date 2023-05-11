const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 3000;

const logStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: logStream }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
