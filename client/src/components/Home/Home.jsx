import React, { useEffect } from 'react'
import Banner from './Banner'
import ProductCard from './ProductCard/ProductCard'
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from '../../Actions/productAction';
import { clearErrors } from '../../Reducers/ProductReducer';
import styles from "./Home.module.scss"


function Home() {
  
  const dispatch = useDispatch();
  const {  products, error } = useSelector((state) => state.products);

  useEffect(() => {
    console.log(products)
    if(error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error])
  return (
    <div>
      <Banner imageUrl= "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/paprika-and-venetian-red-fashion-clothing-banner-template-krx9q4061f1079.webp"/>
      <div className={styles.trending_products}>
        {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>

  )
}

export default Home