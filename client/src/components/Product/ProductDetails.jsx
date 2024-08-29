import React, { useEffect, useState } from 'react';
import styles from '../Product/ProductDetails.module.scss';
import { Link, useParams } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Actions/productAction';
import { addToCart } from '../../Actions/CartActions';

function ProductDetails() {
  
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector((state) => state.products.productDetails);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);


  const handleAddItem = () => {
    if(product && quantity > 0) {
      dispatch(addToCart({id, quantity}));
    }
    alert("Item Added To Cart");
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.prodcutDetialsContainer}>
          <section id={styles.product_details} className={styles.section}>
            <div className={styles.product_container}>
              <div className={styles.prod_details_wrapper}>
                {/*=== Product Details Left-content ===*/}
                <div className={styles.prod_details_left_col}>
                  <div className={styles.prod_details_tabs}>
                    {product.images &&
                      product.images.map((img, i) => (
                        <div key={i} className={styles.image_wrapper}>
                          <img src={img.url} alt={`product-img-${i}`} />
                        </div>
                      ))}
                  </div>
                </div>

                {/*=== Product Details Right-content ===*/}
                <div className={styles.prod_details_right_col_001}>
                  <h1 className={styles.prod_details_title}>{product.name}</h1>

                  <div className={styles.prod_details_ratings}>
                    <span>|</span>
                    <Link to="#" style={{ textDecoration: 'none', color: '#414141' }}>
                      Ratings
                    </Link>
                  </div>

                  <div className={styles.prod_details_price}>
                    <div className={styles.price_box}>
                      <h2 className={styles.price}>
                        $ {product.price} &nbsp;
                        <small className={styles.del_price}>
                          <del>oldPrice</del>
                        </small>
                      </h2>
                      <p className={styles.saved_price}>You save</p>
                      <span className={styles.tax_txt}>(Inclusive of all taxes)</span>
                    </div>

                    <div className={styles.badge}>
                      {product.Stock >= 1 ? (
                        <span className={styles.instock}>
                          <DoneIcon /> In Stock
                        </span>
                      ) : (
                        <span className={styles.outofstock}>
                          <CloseIcon />
                          Out of stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.seprator2}></div>

                  <div className={styles.productDescription}>
                    <div className={styles.productDiscriptiopn_text}>
                      <h4>Description :</h4>
                      <p>{product.description}</p>
                    </div>
                    <div className={styles.prod_details_offers}>
                      <h4>Offers and Discounts</h4>
                      <ul>
                        <li>No Cost EMI on Credit Card</li>
                        <li>Pay Later & Avail Cashback</li>
                      </ul>
                    </div>
                    <div className={styles.deliveryText}>
                      <LocalShippingOutlinedIcon />
                      We deliver! Just say when and how.
                    </div>
                  </div>

                  <div className={styles.seprator2}></div>

                  <Button
                    variant="contained"
                    className={styles.prod_details_addtocart_btn}
                    onClick={handleAddItem}
                    disabled={product.Stock <= 0}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.reviewCard}>
            {/* <ReviewCard product={product} /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
