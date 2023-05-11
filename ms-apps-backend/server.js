const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create a write stream for logging to a file
const logStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);
const app = express();
app.use(morgan('combined', { stream: logStream })); // Use Morgan for logging with a file output

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const PER_PAGE = 9;

const sortByDate = (a, b) => new Date(a.created_at) - new Date(b.created_at);
const sortById = (a, b) => a.id - b.id;

const getSortedPhotos = (photos, sortType) => {
  try {
    if (sortType === 'date') {
      return photos.sort(sortByDate);
    } else if (sortType === 'id') {
      return photos.sort(sortById);
    }
    return photos;
  } catch (error) {
    console.error('Error sorting photos:', error);
    return photos;
  }
};

app.get('/api/photos', async (req, res) => {
  const { category, page, sort } = req.query;
  if (!category || !page) {
    return res
      .status(400)
      .json({ error: 'Category and page parameters are required' });
  }
  try {
    const response = await axios.get(
      `${process.env.PIXABAY_API}?key=${
        process.env.PIXABAY_KEY
      }=${category}&page=${page + 1}&per_page=${PER_PAGE}`
    );

    if (
      response.status !== 200 ||
      !response.data.hits ||
      !response.data.hits?.length ||
      response === null
    ) {
      return res
        .status(response.status)
        .json({ error: 'Error fetching photos from Pixabay API' });
    }
    if (sort) {
      const sortedPhotos = getSortedPhotos(response.data.hits, sort);
      res.json(sortedPhotos);
    } else {
      res.json(response.data.hits);
    }
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Error fetching photos' });
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
