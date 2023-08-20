// Importing required components
import NavBar from '../NavBar/NavBar.js'; //Don't change this position

import { useState, useEffect } from "react";
import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom'; // Import useParams
import { useAuth } from '../../Contexts/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory

const ModifyProduct = () => {

    // Use AuthContext
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin } = useAuth();

    const { productName } = useParams();

    // Local states
    // Product details
    const [name, setName]                     = useState(null);
    const [category, setCategory]             = useState(null);
    const [manufacturer, setManufacturer]     = useState(null);
    const [availableItems, setAvailableItems] = useState(null);
    const [price, setPrice]                   = useState(null);
    const [imageUrl, setImageUrl]             = useState(null);
    const [description, setDescription]       = useState(null);
    // Snackbar
    const [snackbarOpen, setSnackbarOpen]     = useState(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                setName(data.name);
                setCategory(data.category);
                setManufacturer(data.manufacturer);
                setAvailableItems(data.availableItems);
                setPrice(data.price);
                setImageUrl(data.imageUrl);
                setDescription(data.description);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // Support functions to navigate to other pages of the website.
    const history    = useHistory(); // Get the history object
    const navigateTo = (path) => {
    history.push(path); // Use history.push to navigate to the specified path
    };

    // Async function to modify the product in the backend using PUT API
    async function modifyProductInBd (id) {
        console.log(id);
        const accessToken = window.sessionStorage.getItem('access-token');
        const apiUrl4 = "http://localhost:8080/api/products/" + id;
        const headers = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        }

        // params is the request payload for the API
        const params = {
            id: id,
            name: name,
            category: category,
            price: Number(price),
            description: description,
            manufacturer: manufacturer,
            availableItems: availableItems,
            imageUrl: imageUrl
        }
        fetch(apiUrl4, { method: 'PUT', body: JSON.stringify(params), headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(data => {
                // console.log(data);
                setSnackbarOpen(true);
                setTimeout( () => {
                    navigateTo('/products')
                },2000);
            })
            .catch(error => {
                console.error("Error: " + error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        modifyProductInBd(productName);
    }

    // Rendering based on whether the user logged in or not
    if(signedIn == false)
    {
        // If user didn't login, then redirect to login page.
        navigateTo('/login');
    }
    else
    {
        return(
            <Box>
                <NavBar loggedIn={signedIn} isAdmin={isAdmin}/>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                            Product {name} modified successfully
                          </MuiAlert>
                </Snackbar>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Center vertically
                        minHeight: '75vh', // Adjust height to fill the viewport
                        padding: '20px',
                        paddingTop: '40px',
                        width: '400px', margin: 'auto' }}>
                    <Box sx={{pt:2}}>
                        <Typography
                            variant="h5"
                            component="div"
                            align="center"
                            sx={{ flexGrow: 1, pb: 3}}
                        >
                            Modify Product
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='primary'
                            label="Name"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            fullWidth
                            required
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='primary'
                            label="Category"
                            onChange={e => setCategory(e.target.value)}
                            value={category}
                            fullWidth
                            required
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='primary'
                            label="Manufacturer"
                            onChange={e => setManufacturer(e.target.value)}
                            value={manufacturer}
                            fullWidth
                            required
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <TextField
                            type="number"
                            variant='outlined'
                            color='primary'
                            label="Available Items"
                            onChange={e => setAvailableItems(e.target.value)}
                            value={availableItems}
                            fullWidth
                            required
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <TextField
                            type="number"
                            variant='outlined'
                            color='primary'
                            label="Price"
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            required
                            fullWidth
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='primary'
                            label="Image URL"
                            onChange={e => setImageUrl(e.target.value)}
                            value={imageUrl}
                            fullWidth
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='primary'
                            label="Product Description"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            fullWidth
                            sx={{mb: 3}}
                            InputLabelProps={{shrink:true}}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth sx={{bgcolor: '#3f51b5'}}>
                            MODIFY PRODUCT
                        </Button>
                    </form>
                </div>
            </Box>
        );
    }
};

export default ModifyProduct;
