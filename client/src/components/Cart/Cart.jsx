import React from 'react';
import CartItem from './CartItem';
import { Button, Typography, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import styles from "./Cart.module.scss";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const totalPrice = 0; // Example placeholder
  const totalDiscount = 0; // Example placeholder
  const final = 0; // Example placeholder
  const isFocused = false; // Example placeholder
  const isValid = true; // Example placeholder

  return (
    <div className={styles.cartpage}>
      {/* Grid Container for Left and Right Columns */}
      <div className={styles.gridContainer}>
        {/* Left Container for Cart Items */}
        <div className={styles.cart_left_container}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartContainer}>
              <RemoveShoppingCartIcon className={styles.cartIcon} />
              <Typography variant="h5" component="h1" className={styles.cartHeading}>
                Your Shopping Cart is Empty
              </Typography>
              <Typography variant="body1" className={styles.cartText}>
                Nothin' to see here.
              </Typography>
              <Typography variant="body1" className={styles.cartText}>
                Let's get shopping!
              </Typography>
              <Link to="/product">
                <Button className={styles.shopNowButton}>Shop Now</Button>
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId} className={styles.cart_content_wrapper}>
                <CartItem item={item} />
              </div>
            ))
          )}
        </div>

        {/* Right Container for Order Summary */}
        <div className={styles.cart_right_container}>
          <div className={styles.order_summary}>
            <h4>
              Order Summary &nbsp; ({cartItems.length} {cartItems.length > 1 ? "items" : "item"})
            </h4>
            <div className={styles.order_summary_details}>
              <div className={styles.order_Summary_Item}>
                <span>Original Price</span>
                <p>{totalPrice}</p>
              </div>

              <div className={styles.order_Summary_Item}>
                <span>Discount</span>
                <p>
                  <del>{totalDiscount}</del>
                </p>
              </div>

              <div className={styles.order_Summary_Item}>
                <span>Delivery</span>
                <p>
                  <b>Free</b>
                </p>
              </div>

              <div className={styles.separator_cart}></div>
              <div className={styles.order_Summary_Item}>
                <div>
                  <h4>Total Price</h4>
                  <p style={{ fontSize: "14px", marginTop: "-10px", color: "#414141" }}>
                    (Inclusive of all taxes)
                  </p>
                </div>
                <p>
                  <b>{final}</b>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.coupon_box_wrapper}>
            <div className={`${styles.coupon_box_content} ${isFocused ? styles.focused : ""}`}>
              <TextField
                label="Enter coupon code"
                error={!isValid}
                helperText={!isValid && "Invalid coupon code"}
                variant="outlined"
                size="small"
                style={{ width: "200px", marginRight: "1rem" }}
              />
              <Button
                variant="contained"
                color="primary"
                className={styles.coupon_box_apply_btn}
              >
                Apply
              </Button>
            </div>
          </div>

          <Button
            variant="contained"
            className={styles.btn_custom}
          >
            Checkout
          </Button>

          <div className={styles.paymentLogoImg}>
            <img
              src={"../../../Image/cart.png"}
              alt="payment-icons"
              className={styles.paymentImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
