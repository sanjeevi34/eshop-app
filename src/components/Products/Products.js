import NavBar from '../NavBar/NavBar.js';
import React, { useState, useEffect } from 'react';

import { useAuth } from '../../common/Contexts/AuthContext';

import { Typography, Container, Grid, Select, MenuItem, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ProductCategories from '../ProductCategories/ProductCategories.js';
import ProductCard from '../ProductCard/ProductCard.js';
import { useHistory } from 'react-router-dom'; // Import useHistory

const Products = () => {

    // AuthContext to store login details as global state.
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin, orderPlaced,  setOrderPlaced} = useAuth();

    // To Navigate the pages.
    const history = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    // Local states
    const [products, setProducts]                 = useState(null);      // Products
    const [categories, setCategories]             = useState(null);      // Category
    const [searchData, setSearchData]             = useState(null);      // Search Data from NavBar
    const [selectedCategory, setSelectedCategory] = useState('All');     // Category selection
    const [sorting, setSorting]                   = useState('Default'); // Sorting

    // Snack bar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // State to refetch the data.
    const [refetchData, setRefetchData] = useState(false);

    // Display snack bar when order is placed
    useEffect( () => {
        if(orderPlaced == true)
        {
            setSnackbarOpen(true);
            setOrderPlaced(false);
        }
    },[]);

    // Async function to get products through GET API Call
    async function getProductsFromBe () {
        fetch('http://localhost:8080/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                // Process the data returned from the API
                setProducts(data);
                //console.log(data[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if(refetchData == true)
        {
            getProductsFromBe();
        }
        setRefetchData(false);
    },[refetchData]);

    // This fetch executes only the first time.
    useEffect(() => {
        // Make a GET request to fetch all the products
        fetch('http://localhost:8080/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                // Process the data returned from the API
                setProducts(data);
                //console.log(data[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Make a GET request to fetch all the product categories
        fetch('http://localhost:8080/api/products/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                // Process the data returned from the API
                setCategories(['All' , ...data]);
                //console.log(data[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // Select category handle
    const handleSelectCategory = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    // Sorting handle
    const handleSortChange = (event) => {
        setSorting(event.target.value);
    };

    // Filter and sort handle
    const filterAndSortProducts = (product) => {

        if(searchData == null || product.name.toLowerCase().includes(searchData.toLowerCase()))
        {
            if (selectedCategory === 'All' || product.category === selectedCategory) {
                return product;
            }
        }

        return null;
    };

    // Sorting based on the selection
    const sortProducts = (a, b) => {
        if (sorting === 'Price: HighToLow') {
            return parseFloat(b.price) - parseFloat(a.price);
        }
        if (sorting === 'Price: LowToHigh') {
            return parseFloat(a.price) - parseFloat(b.price);
        }
        // Add sorting logic for other criteria if needed
        return 0; // Default: No sorting
    };

    // Products after sorting
    const filteredAndSortedProducts = (products != null )                                       ?
                                      products.filter(filterAndSortProducts).sort(sortProducts) :
                                      null;

    // Rendering based on the logged in condition
    if(signedIn == true) {
        return (
            <Box>
                <NavBar loggedIn={true} searchEnable={true} isAdmin={isAdmin} searchDataCallBack={setSearchData}/>
                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                    <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                      Order placed successfully!
                    </MuiAlert>
                </Snackbar>
                <Container>
                    <Box sx={{ pb:2 }}>
                    </Box>
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
                                <MenuItem value="Price: HighToLow">Price: High to Low</MenuItem>
                                <MenuItem value="Price: LowToHigh">Price: Low to High</MenuItem>
                                <MenuItem value="Newest">Newest</MenuItem>
                            </Select>
                        </Box>
                        <Grid container spacing={3} sx={{ pt: 4 }}>
                            {(filteredAndSortedProducts != null) ?
                                filteredAndSortedProducts.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <ProductCard product={product} setRefetchData={setRefetchData}/>
                                    </Grid>
                                )) : null}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        )
    }
    else {
      navigateTo('/login');
    }
}

export default Products;