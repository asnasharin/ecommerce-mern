import React from 'react'
import CartItem from './CartItem'
import { Typography } from '@mui/material'
import { Link } from "react-router-dom"
import styles from "./Cart.module.scss"

function Cart() {

  return (
    <>
    <div className={styles.cartpage}>
        <div className={styles.cart_HeaderTop}>
            <div className={styles.HeaderLeft}>
                <Typography variant='h5' component="h1" className={styles.cartHeading}>
                    Shopping Cart
                </Typography>
                <Typography variant='body2' className={styles.cartText2}>
                    TOTAL (cartitem) <b>final</b>
                </Typography>
            </div>
            <div className={styles.seperate_cart2}>

            </div>
        </div>
    </div>
    <div className="cart_content_wrapper">
        <div className="cart_left_container">
            <Link>
            <CartItem />
            </Link>
        </div>
    </div>
    </>
  )
}

export default Cart