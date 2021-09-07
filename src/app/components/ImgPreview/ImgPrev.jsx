import React, { useState } from 'react';
import placeholder from '../../../images/placeholder.png';
import './_style.scss';

const ImgPrev = ({handleImage, image}) => {
  const [{alt, src}, setImg] = useState({
    src: image || placeholder,
    alt: 'Upload an Image'
  });

  const handleImg = (e) => {
    if(e.target.files[0]) {
      const image = e.target.files[0];
      setImg({
        src: URL.createObjectURL(image),
        alt: image.name
      });
      handleImage(image);    
    }   
  }

  return (
    <div className="input-container">
      <input 
        type="file" 
        accept=".png, .jpg, .jpeg" 
        id="photo" 
        className="visually-hidden"
        onChange={handleImg}
      />
      <label htmlFor="photo" className="file-label" />
      <img src={src} alt={alt} className="img-preview"/>
    </div>
  );
}

export default ImgPrev;