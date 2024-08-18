import React, { useState } from 'react';
import { Avatar, Box, Button, FormControl, Select, TextField, Typography, InputAdornment } from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, AttachMoney as AttachMoneyIcon, Storage as StorageIcon, Info as InfoIcon, Description as DescriptionIcon, CloudUpload as CloudUploadIcon, Collections as CollectionsIcon } from '@mui/icons-material';
import SideBar from './SideBar';
import styles from "./NewProduct.module.scss"
import { useDispatch, useSelector } from 'react-redux';

const NewProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products.admin)

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [productinfo, setProductInfo] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  
  return (
    <div className={styles.updateProduct}>
      <SideBar />
      <div className={styles.secondBox1}>
        <div className={styles.formContainer}>
          <form className={styles.form} encType="multipart/form-data">
            <Avatar className={styles.avatar}>
              <AddCircleOutlineIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={styles.heading}>
              Create Product
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              label="Product Name"
              required
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ShoppingCartOutlinedIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Price"
              required
              fullWidth
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AttachMoneyIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Stock"
              required
              fullWidth
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StorageIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Product Info"
              required
              fullWidth
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth variant="outlined" className={styles.formControl}>
              <Typography variant="body2" className={styles.labelText}>
                Choose Category
              </Typography>
              <Select
                className={styles.select}
                inputProps={{ name: "category", id: "category-select" }}
                MenuProps={{
                  classes: { paper: styles.menu },
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                  getContentAnchorEl: null,
                }}
              >
                {/* Add MenuItem components for categories here */}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              fullWidth
              label="Product Description"
              multiline
              rows={1}
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DescriptionIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <div className={styles.imageUpload}>
              <CollectionsIcon fontSize="large" className={styles.imgIcon} />
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="contained" className={styles.uploadButton} startIcon={<CloudUploadIcon />}>
                  Upload Images
                </Button>
              </label>
            </div>

            <Box className={styles.imagePreview}>
              {/* Display uploaded images here */}
              <img src="" alt="Product Preview" className={styles.image} />
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              className={styles.submitButton}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
