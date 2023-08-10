import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ProductCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={onSelectCategory}
        aria-label="Product Categories"
    >
        {(categories!= null) ? categories.map((category) => (
            <ToggleButton key={category} value={category}>
                {category}
            </ToggleButton>
        )) : null}
    </ToggleButtonGroup>
  );
};

export default ProductCategories;
