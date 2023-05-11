const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
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

app.get('/api/photos/sort', async (req, res) => {
  const { category, sort } = req.query;
  if (!category || !sort) {
    return res
      .status(400)
      .json({ error: 'Category and Sort parameters are required' });
  }
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&sort=${sort}&per_page=${PER_PAGE}`
    );
    if (response.status !== 200) {
      return res
        .status(response.status)
        .json({ error: 'Error fetching photos from Pixabay API' });
    }
    const sortedPhotos = getSortedPhotos(response.data.hits, sort);
    res.json(sortedPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Error fetching photos' });
  }
});

app.get('/api/photos/page', async (req, res) => {
  const { category, page, sort } = req.query;
  if (!category || !page) {
    return res
      .status(400)
      .json({ error: 'Category and page parameters are required' });
  }
  try {
    let response = null;
    console.log('sort', sort);
    if (sort !== null) {
      console.log('without sort');
      response = await axios.get(
        `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&page=${
          page + 1
        }&per_page=${PER_PAGE}`
      );
    } else {
      console.log('with sort');
      response = await axios.get(
        `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&page=${
          page + 1
        }&per_page=${PER_PAGE}&sort=${sort}`
      );
    }

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
    res.json(response.data.hits);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Error fetching photos' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
