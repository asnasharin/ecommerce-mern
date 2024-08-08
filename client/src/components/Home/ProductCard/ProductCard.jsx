import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Rating, CardActions } from '@mui/material';
import styles from './ProductCard.module.scss'; // Import the SCSS module

const ProductCard = () => {
  // const { image, title, description, oldPrice, discount, price, reviews, imageName } = product;

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        className={styles.cardMedia}
        // image={image}
        // alt={imageName}
        image='https://m.media-amazon.com/images/I/71u77Ob5LWL._SX450_.jpg'
      />
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
          {/* {title} */}
          title
        </Typography>
        <Typography variant="body2" className={styles.cardDescription}>
          {/* {description} */}
          desc
        </Typography>
        {/* <Typography variant="body2" className={styles.cardReviews}>
          Reviews:
        </Typography> */}
        <Rating name="read-only" readOnly className={styles.cardRating} />
        <Box display="flex" alignItems="center" gap="10px">
              <Typography variant="body1" className={styles.oldPrice}>
                oldPrice
              </Typography>
              <Typography variant="body1" className={styles.newPrice}>
                discountPrice
              </Typography>
            </Box>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button size="small" className={styles.cartButton}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
