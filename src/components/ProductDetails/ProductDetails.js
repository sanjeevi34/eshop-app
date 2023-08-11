import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import NavBar from '../NavBar/NavBar.js';
import { useAuth } from '../../Contexts/AuthContext';
import { Box, Container, Paper, Grid, Typography, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams
import ProductCategories from '../ProductCategories/ProductCategories.js';

//const product = {
//                    id: 1,
//                    name: 'OnePlus8T',
//                    price: 50000,
//                    category: 'Electronics',
//                    imageUrl: 'https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png', // Replace with actual image URL
//                    description: 'OnePlus phones are premium Android smartphones known for their powerful performance.',
//                };

const ProductDetails = () => {
    const { productName } = useParams();
    const { authUser, setAuthUser, signedIn, setSignedIn } = useAuth();
    const [ quantity, setQuantity ] = useState("");
    const [quantityError, setQuantityError] = useState(false);
    const [ product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);      // Category
    const [selectedCategory, setSelectedCategory] = useState('All');     // Category selection

    // To Navigate the pages.
    const history = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    const handleSelectCategory = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    // This fetch executes only the first time.
    useEffect(() => {
        // Make a GET request to fetch the requested product details
        //console.log(productName);
        fetch('http://localhost:8080/api/products/' + productName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                // Process the data returned from the API
                //console.log(data);
                setProduct(data);
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

  const handleQuantityChange = (event) => {
    const inputValue = event.target.value;
    // Use a regular expression to check if the input consists of only numeric characters
    if (/^\d*$/.test(inputValue)) {
      setQuantity(inputValue);
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation before submitting
    if ((!quantity || !/^\d*$/.test(quantity)) ||
        (quantity == 0)                        ||
        (quantity > product.availableItems))
    {
      setQuantityError(true);
    } else {
      // Validation successful, continue with submission or other actions
      setQuantityError(false);
      //console.log(quantity);
    }
  };

if(signedIn == true) {  // Should make this true by default @todo
    if(product == null)
    {
        return (
            <NavBar loggedIn={true}/>
        )
    }
    else {
        return (
        <Box>
            <NavBar loggedIn={true}/>
            <Box sx={{ pb: 2 }}>
            </Box>
            <ProductCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                  </Grid>
                  {/* Right Side (Product Info) */}
                  <Grid item xs={5} align="left" container direction="column">
                    <Box display="flex">
                        <Grid item xs="auto">
                        <Typography variant="h4">{product.name}</Typography>
                        </Grid>
                        <Grid item xs="auto">
                        <Box
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              p: 1,
                              pl: 2,
                              pr: 2,
                              marginLeft: 2,
                              borderRadius: 10
                            }}
                        >
                            Available Quantity: {product.availableItems}
                        </Box>
                        </Grid>
                    </Box>
                    <Typography variant="subtitle1" sx={{ pt: 2}}>Category: <b>{product.category}</b></Typography>
                    <Typography variant="body1" sx={{ pt: 2}}>{product.description}</Typography>
                    <Typography variant="h6" color="error" sx={{ pt: 2}}>Price: {'₹' + product.price}</Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                          label="Enter Quantity"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          required
                          onChange={handleQuantityChange}
                          onChange={handleQuantityChange}
                          helperText={quantityError ? 'Please enter a valid numeric quantity' : ''}
                          value={quantity}
                        />
                        <Grid item xs="auto">
                            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2}}>Place Order</Button>
                        </Grid>
                    </form>
                  </Grid>
                </Grid>
            </Container>
        </Box>
      );
    }
    }
    else {
    navigateTo('/login');
    }
}

export default ProductDetails;