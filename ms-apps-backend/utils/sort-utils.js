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

module.exports = { getSortedPhotos };
