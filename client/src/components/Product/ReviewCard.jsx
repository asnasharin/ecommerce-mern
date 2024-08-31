import React, { Suspense, useState } from "react";
import Card from "./Card";
import { Button, Grid, Rating, Typography } from "@mui/material";
import styles from "../Product/ReviewCard.module.scss";
const DialogBox = React.lazy(() => import("./DialogBox.jsx")) 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ReviewCard({ product }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      alert("success");
      navigate("/login");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.reviewRoot}>
      {/* Header and Button container */}
      <div className={styles.headerContainer}>
        <Typography variant="h5" component="h1" className={styles.reviewHeader}>
          Users Reviews
        </Typography>
        <Button
          variant="contained"
          className={styles.submitBtn}
          onClick={handleClickOpen}
        >
          Write your Review
        </Button>
      </div>

      <Suspense fallback={<h2>Loading...</h2>}>
        <DialogBox
          open={open}
          handleClose={handleClose}
          className={styles.dialog}
        />
      </Suspense>

      <Grid container alignItems="center" className={styles.ratingGrid}>
        <Grid item className={styles.ratingContainer}>
          <Rating
            value={product.ratings}
            precision={0.5}
            readOnly
            className={styles.star}
          />
        </Grid>
        <Typography variant="body2" className={styles.ratingNumber}>
          {product.ratings} stars
        </Typography>
        <Grid item>
          <Typography variant="body2">
            <strong>Total Reviews:</strong> {product.numOfReviews}
          </Typography>
        </Grid>
      </Grid>

      {/* Review cards container */}
      <div className={styles.reviewCardContainer}>
        {product.reviews && product.reviews.map((review) => (
          <Card review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}

export default ReviewCard;
