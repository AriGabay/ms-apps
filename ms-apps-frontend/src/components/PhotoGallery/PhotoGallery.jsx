import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setSortBy } from '../../actions/photoActions';
import { fetchPhotos } from '../../services/photoService';
import './PhotoGallery.css';
import './Loader.css';
import CategorySelector from '../CategorySelector/CategorySelector';

const PhotoGallery = () => {
  const { photos, currentPage, sortBy, category, loading } = useSelector(
    (state) => state.photos
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos(selectedCategory, currentPage, sortBy));
  }, [dispatch, currentPage, selectedCategory, sortBy]);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };
  const handleNextClick = () => {
    if (currentPage < photos.length) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const changeSarch = (e) => {
    const value = e.target.value;
    dispatch(setSortBy(value));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    handleModalOpen('photoDetails');
  };

  return (
    <div className="photo-gallery-container">
      <div className="controllers">
        <button onClick={() => handleModalOpen('category')}>
          Select Category
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentPage + 1 > photos.length}
        >
          Next
        </button>
        <button onClick={handlePrevClick} disabled={currentPage - 1 < 0}>
          Prev
        </button>
        <div className="filter-select-container">
          <label htmlFor="filter-select">Filter By :</label>
          <select id="filter-select" onChange={changeSarch}>
            <option value={'date'}>date</option>
            <option value={'id'}>id</option>
          </select>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={handleModalClose}>
              &times;
            </span>
            {modalType === 'category' ? (
              <CategorySelector
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setShowModal={setShowModal}
              />
            ) : modalType === 'photoDetails' && selectedPhoto ? (
              <>
                <h3>Photo Details</h3>
                <p>Views: {selectedPhoto.views}</p>
                <p>Downloads: {selectedPhoto.downloads}</p>
                <p>Collections: {selectedPhoto.collections}</p>
              </>
            ) : null}
          </div>
        </div>
      )}
      <div className={!loading ? 'photo-grid' : ''}>
        {loading ? (
          <div className="circle-loader-container">
            <div className="circle-loader"></div>
          </div>
        ) : (
          photos &&
          photos.length > 0 &&
          photos.map((photo) => (
            <div
              className="photo"
              key={photo.id}
              onClick={() => handlePhotoClick(photo)}
            >
              <img src={photo.webformatURL} alt={photo.tags} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
