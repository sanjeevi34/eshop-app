import NavBar from '../NavBar/NavBar.js';
import React, { useState, useEffect } from 'react';

import { useAuth } from '../../Contexts/AuthContext';

import { Typography, Container, Grid, Select, MenuItem, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ProductCategories from '../ProductCategories/ProductCategories.js';
import ProductCard from '../ProductCard/ProductCard.js';
import { useHistory } from 'react-router-dom'; // Import useHistory

/*const products1 = [
    {
        id: 1,
        name: 'OnePlus8T',
        price: 50000,
        category: 'Electronics',
        imageUrl: 'https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png', // Replace with actual image URL
        description: 'OnePlus phones are premium Android smartphones known for their powerful performance.',
    },
    {
        id: 2,
        name: 'boAt Airdopes Alpha True Wireless Earbuds',
        price: 5500,
        category: 'Electronics',
        imageUrl: 'https://www.takemetechnically.com/wp-content/uploads/2023/07/boat-airdopes-alpha-64a304b5a1680.webp', // Replace with actual image URL
        description: 'boAt Airdopes Alpha True Wireless Earbuds',
    },
    {
        id: 3,
        name: 'NIKE Revolution Running Shoe',
        price: 13500,
        category: 'Apparel',
        imageUrl: 'https://assets.ajio.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a2a6a/-473Wx593H-469034008-black-MODEL.jpg', // Replace with actual image URL
        description: 'NIKE Revolution 6 NN Running Shoes For Men (Black, 10)',
    }
];*/

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

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const [refetchData, setRefetchData] = useState(false);

    // Need to change this based on GET API
    //const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Apparel']; // List of categories

    /*useEffect(() => {
        console.log(searchData);
    }, [searchData]);*/

    // Display snack bar when order is placed
    useEffect( () => {
        if(orderPlaced == true)
        {
            setSnackbarOpen(true);
            setOrderPlaced(false);
        }
    },[]);

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

    const handleSelectCategory = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    const handleSortChange = (event) => {
        setSorting(event.target.value);
    };

    const filterAndSortProducts = (product) => {

        if(searchData == null || product.name.toLowerCase().includes(searchData.toLowerCase()))
        {
            if (selectedCategory === 'All' || product.category === selectedCategory) {
                return product;
            }
        }

        return null;
    };

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

    const filteredAndSortedProducts = (products != null )                                       ?
                                      products.filter(filterAndSortProducts).sort(sortProducts) :
                                      null;

    if(signedIn == true) {  //Change this condition to true @todo
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