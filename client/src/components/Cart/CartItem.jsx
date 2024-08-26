import { Card, CardContent, CardMedia, IconButton, Input, Typography } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import styles from "./CartItem.module.scss"
import React from 'react'

function CartItem({ item}) {

  return (
    <Card 
    className= {styles.roots}
    >
      <CardMedia
        className={styles.media}
        image={item.image}
        title={item.name}
      />
      <CardContent >
        <div >
          <div >
            <Typography variant={styles.subtitle1} >
              {item.name}
            </Typography>

            <IconButton
              aria-label="delete"
              className={styles.cartDeleteIcon}
            //   onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div >
            <Typography  variant={styles.body1}>
              {item.price}
            </Typography>
            <Typography variant={styles.subtitle1}>
              finalPrice
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="black"
              className={styles.itemOldPrice}
            >
              <del>dis price</del>
            </Typography>
          </div>
        </div>
        <div >
          <div className={styles.prod_details_additem}>
            <h5>QTY:{item.quantity}</h5>
            <div className={styles.additem}>
              <IconButton
                // onClick={() => decreaseQuantity(item.productId, item.quantity)}
                className={styles.additem_decrease}
              >
                <RemoveIcon />
              </IconButton>
              <Input
                readOnly
                type="number"
                // value={item.quantity}
                className="input"
              />
              <IconButton
                // onClick={() =>
                //   increaseQuantity(item.productId, item.quantity, item.stock)
                // }
                className={styles.additem_increase}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div >
            <Typography variant={styles.body1} >
              TOTAL:
            </Typography>
            <Typography variant={styles.subtitle1} >
              total
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CartItem