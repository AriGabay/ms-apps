const express = require('express');
const axios = require('axios');
const { getSortedPhotos } = require('./utils/sort-utils');
const router = express.Router();
const PER_PAGE = 9;

router.get('/api/photos', async (req, res, next) => {
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

module.exports = router;
