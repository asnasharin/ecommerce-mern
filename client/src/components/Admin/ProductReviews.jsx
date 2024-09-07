import React, { useState } from 'react';
import { Avatar, Typography, TextField, Button, InputAdornment } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import Star from '@mui/icons-material/Star';
import { DataGrid } from '@mui/x-data-grid';
import styles from './ProductReviews.module.scss'; 

function ProductReviews() {
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]); 
  const rows = []; 
  const columns = []; 

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    
  };

 

  return (
    <>
      <div className={styles.secondBox_0} >
        <div className={styles.formSection}>
          <form
            className={styles.form}
            onSubmit={productReviewsSubmitHandler}
          >
            <Avatar className={styles.avatar}>
              <StarRateIcon />
            </Avatar>

            <Typography
              variant="h5"
              component="h1"
              className={styles.heading}
            >
              All Reviews
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              className={`${styles.nameInput} ${styles.textField}`}
              label="Product Id"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Star
                      style={{
                        fontSize: 20,
                        color: "#414141",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              id="createProductBtn"
              type="submit"
              fullWidth
              variant="contained"
              className={styles.loginButton}
              disabled={loading || productId === ""}
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className={styles.productListContainer}>
              <h4 className={styles.productListHeading}>ALL PRODUCTS</h4>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight
                disableSelectionOnClick
                className={styles.productListTable}
              />
            </div>
          ) : (
            <h1 className={styles.heading_02}>No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductReviews;
