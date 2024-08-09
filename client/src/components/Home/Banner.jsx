// src/components/Banner.jsx

import React from 'react';
import styles from './Banner.module.scss';
import { Typography, Button, Container } from '@mui/material';

const Banner = ({ imageUrl, title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default Banner;
