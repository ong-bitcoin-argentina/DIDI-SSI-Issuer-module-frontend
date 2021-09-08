import React from 'react';
import placeholder from '../../../images/placeholder.png';
import './_style.scss';

const ImgPrev = ({handleImage, image}) => {
  return (
    <div className="input-container">
      <input 
        type="file" 
        accept=".png, .jpg, .jpeg" 
        id="photo" 
        className="visually-hidden"
        onChange={handleImage}
      />
      <label htmlFor="photo" className="file-label" />
      <img src={image || placeholder} alt="upload" className="img-preview"/>
    </div>
  );
}

export default ImgPrev;