import NavBar from '../NavBar/NavBar.js';
import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { Typography, Container, Grid, Select, MenuItem, Box } from '@mui/material';

import ProductCategories from '../ProductCategories/ProductCategories.js';
import ProductCard from '../ProductCard/ProductCard.js';
import { useHistory } from 'react-router-dom'; // Import useHistory

const products = [
    {
        id: 1,
        name: 'OnePlus8T',
        price: 50000,
        category: 'Electronics',
        image: 'https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png', // Replace with actual image URL
        description: 'OnePlus phones are premium Android smartphones known for their powerful performance.',
    },
    {
        id: 2,
        name: 'boAt Airdopes Alpha True Wireless Earbuds',
        price: 5500,
        category: 'Electronics',
        image: 'https://www.takemetechnically.com/wp-content/uploads/2023/07/boat-airdopes-alpha-64a304b5a1680.webp', // Replace with actual image URL
        description: 'boAt Airdopes Alpha True Wireless Earbuds',
    },
    {
        id: 3,
        name: 'NIKE Revolution Running Shoe',
        price: 13500,
        category: 'Apparel',
        image: 'https://assets.ajio.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a2a6a/-473Wx593H-469034008-black-MODEL.jpg', // Replace with actual image URL
        description: 'NIKE Revolution 6 NN Running Shoes For Men (Black, 10)',
    }
  // Add more product objects as needed
];

const Products = () => {
    const {         authUser,
                    setAuthUser,
                    signedIn,
                    setSignedIn } = useAuth();

    const history = useHistory(); // Get the history object

    const navigateTo = (path) => {
    history.push(path); // Use history.push to navigate to the specified path
    };

    const [selectedCategory, setSelectedCategory] = useState('All'); // Initial category selection

    const [sorting, setSorting] = useState('Default');

    const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Apparel']; // List of categories

    const handleSelectCategory = (event, newCategory) => {
    setSelectedCategory(newCategory);
    };

    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter((product) => product.category === selectedCategory);

  const handleSortChange = (event) => {
    setSorting(event.target.value);
  };

  const filterAndSortProducts = (product) => {
    if (selectedCategory === 'All' || product.category === selectedCategory) {
      return product;
    }
    return null;
  };

  const sortProducts = (a, b) => {
    if (sorting === 'PriceHighToLow') {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    if (sorting === 'PriceLowToHigh') {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    // Add sorting logic for other criteria if needed
    return 0; // Default: No sorting
  };

    const sortedProducts = [...filteredProducts].sort(sortProducts);

  const filteredAndSortedProducts = products
    .filter(filterAndSortProducts)
    .sort(sortProducts);

    if(signedIn == true) {  //Change this condition to true
        return (
            <div>
            <NavBar loggedIn={true}/>
            Signed In
                <Container>
                  <ProductCategories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                  />
                  <Box sx={{ marginTop: 2 }}>
                      <Box align="left">
                          <Typography variant="h6">Sort By:</Typography>
                          <Select value={sorting} onChange={handleSortChange}>
                            <MenuItem value="Default">Default</MenuItem>
                            <MenuItem value="PriceHighToLow">Price High to Low</MenuItem>
                            <MenuItem value="PriceLowToHigh">Price Low to High</MenuItem>
                          </Select>
                      </Box>
                      <Grid container spacing={3} sx={{ pt: 4 }}>
                        {filteredAndSortedProducts.map((product) => (
                          <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                          </Grid>
                        ))}
                      </Grid>
                  </Box>
                </Container>
            </div>
        )
    }
    else {
//        return (
//            <div>
//            <NavBar loggedIn={false}/>
//            Not Signed In
//            </div>
//        )
      navigateTo('/login');
    }
}

export default Products;