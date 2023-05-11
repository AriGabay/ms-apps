import React from 'react';

const Photo = ({ photo }) => {
  return (
    <div className="photo-container">
      <img src={photo.webformatURL} alt={photo.tags} className="photo-image" />
      <div className="photo-info">
        <p>Views: {photo.views}</p>
        <p>Downloads: {photo.downloads}</p>
        <p>Collections: {photo.collections}</p>
      </div>
    </div>
  );
};

export default Photo;
