import React, { useEffect } from 'react';
import styles from './Product.module.scss';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography } from '@mui/material';
import { ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../Actions/productAction";
import ProductCard from "../Home/ProductCard/ProductCard";

function Product() {
  const categories = ["men", "women", "kids", "furniture", "shoe", "perfumes"];
  const { products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <div className={styles.productPage}>
      <div className={styles.filterBox}>
        {/* Price Filter */}
        <div className={styles.priceFilter}>
          <Typography style={{ fontSize: '18px', fontWeight: 700, color: '#414141' }}>
            Price
          </Typography>
          <Slider min={0} max={100000} step={100} valueLabelDisplay='auto' />
          <div className={styles.priceSelectors}>
            <Select
              className={styles.priceOption}
              defaultValue={5000}
              IconComponent={ArrowDropDown}
            >
              <MenuItem value={5000} className={styles.menu_item}>5000</MenuItem>
              <MenuItem value={10000} className={styles.menu_item}>10000</MenuItem>
            </Select>
            <span className={styles.toText}>to</span>
            <Select
              className={styles.priceOption}
              defaultValue={50000}
              IconComponent={ArrowDropDown}
            >
              <MenuItem value={50000} className={styles.menu_item}>50000</MenuItem>
              <MenuItem value={20000} className={styles.menu_item}>20000</MenuItem>
            </Select>
          </div>
        </div>

        <div className={styles.filter_divider}></div>

        {/* Categories Filter */}
        <div className={styles.categoriesFilter}>
          <Typography style={{ fontSize: "18px", fontWeight: 700, color: "#414141" }}>
            Categories
          </Typography>
          <ul className={styles.categoryBox}>
            {categories.map((category, index) => (
              <li key={index}>
                <label htmlFor={`category-${index}`}>
                  <input type="checkbox" id={`category-${index}`} />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.filter_divider}></div>

        {/* Ratings Filter */}
        <div className={styles.ratingsFilter}>
          <Typography style={{ fontSize: "18px", fontWeight: 700, color: "#414141" }}>
            Ratings Above
          </Typography>
          <RadioGroup row>
            <FormControlLabel value="4" control={<Radio />} label="4★ & above" />
            <FormControlLabel value="3" control={<Radio />} label="3★ & above" />
            <FormControlLabel value="2" control={<Radio />} label="2★ & above" />
          </RadioGroup>
        </div>
      </div>

      <div className={styles.productsContainer}>
        <div className={products.length < 2 ? styles.products1 : styles.products}>
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
