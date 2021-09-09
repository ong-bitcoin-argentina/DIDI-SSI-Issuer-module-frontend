import React from 'react';
import { CircularProgress, Grid } from "@material-ui/core";
import placeholder from '../../../images/placeholder.png';
import './_style.scss';

const ImgPrev = ({handleImage, image, isLoading}) => {
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
      {isLoading ?
        <Grid item xs={2} container justify="center" alignItems="center">
          <CircularProgress />
        </Grid>
      :
        <img src={image || placeholder} alt="upload" className="img-preview"/>}
    </div>
  );
}

export default ImgPrev;