import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const Image = ({isLoading, image}) => {
  return 	isLoading ? 
    <Grid item xs={2} container justify="center" alignItems="center">
      <CircularProgress />
    </Grid>
  :
    <img src={image.src} alt={image.alt} className="img-preview"/>
};

export default Image;