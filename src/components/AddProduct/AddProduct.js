import { useState, useEffect } from "react";
import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
    Box,
    TextField,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CreatableSelect from 'react-select/creatable';
import { Link } from "react-router-dom"
import { useAuth } from '../../Contexts/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory

// Importing components
import NavBar from '../NavBar/NavBar.js'; //Don't change this position

const AddProduct = () => {

    // Use AuthContext
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin } = useAuth();

    // Local states
    // Product details
    const [name, setName]                     = useState(null);
    const [manufacturer, setManufacturer]     = useState(null);
    const [availableItems, setAvailableItems] = useState(null);
    const [price, setPrice]                   = useState(null);
    const [imageUrl, setImageUrl]             = useState(null);
    const [description, setDescription]       = useState(null);
    const [category, setCategory]             = useState(null);
    // Options
    const [options, setOptions]   = useState({ label: 'Option 1', value: 'option1' });
    const handleOptionChange      = (newValue, actionMeta) => {
                                        setCategory(newValue);
                                    };
    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose             = () => {
                                                setSnackbarOpen(false);
                                            };

    // Used to populate the options with the product categories during intial load
    useEffect( () => {
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
                //console.log(data);
                const temp = data.map( (x) => ({ label: x, value: x }));
                setOptions(temp);
                //console.log(options);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);

    // Async function to add the product to the backend using POST API call
    async function addProductToBackend(name, category, manufacturer, availableItems, price, imageUrl, description) {
         // params is the request payload for the POST API call
        const params = {
            name: name,
            category: category,
            price: price,
            description: description,
            manufacturer: manufacturer,
            availableItems: availableItems,
            imageUrl: imageUrl
        }
        try {
            const accessToken = window.sessionStorage.getItem('access-token');
            const rawResponse = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "x-auth-token": accessToken,
                'Authorization': `Bearer ${accessToken}`
                }
            });

            //const result = await rawResponse.json();
            if(rawResponse.ok) {
                //alert('Product Added');
                setSnackbarOpen(true);

            } else {
                const error = new Error();
                error.message = 'Something went wrong.';
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
            alert('Not able to add the product');
        }
    }

    // Handle submission of the add product form
    const handleSubmit = (event) => {
          event.preventDefault();
          addProductToBackend(name, category.value, manufacturer, availableItems, price, imageUrl, description);
    }

    // Support functions to navigate to other pages of the website.
    const history    = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    // Rendering content of the component based on whether the user logged in or not
    if(!signedIn)
    {
        // If the user is not logged in, then it redirects to the login page
        navigateTo('/login');
    }
    else
    {
        return (
        <Box>
            <NavBar loggedIn={signedIn} isAdmin={isAdmin}/>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                      <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                        Product {name} added successfully
                      </MuiAlert>
            </Snackbar>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center vertically
                    minHeight: '75vh', // Adjust height to fill the viewport
                    padding: '20px',
                    width: '400px', margin: 'auto' }}>
                <Box>
                    <Typography
                        variant="h5"
                        component="div"
                        align="center"
                        sx={{ flexGrow: 1, pb: 2}}
                    >
                        Add Product
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        fullWidth
                        required
                        sx={{mb: 2}}
                    />
                    <Box sx={{mb: 2}} >
                        <CreatableSelect
                            value={category}
                            onChange={handleOptionChange}
                            isClearable
                            options={options}
                            style={{background: 'rgba(0, 0, 0, 0)'}}
                            required
                        />
                    </Box>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Manufacturer"
                        onChange={e => setManufacturer(e.target.value)}
                        value={manufacturer}
                        fullWidth
                        required
                        sx={{mb: 2}}
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
                        sx={{mb: 2}}
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
                        sx={{mb: 2}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Image URL"
                        onChange={e => setImageUrl(e.target.value)}
                        value={imageUrl}
                        required
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Product Description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{bgcolor: '#3f51b5'}}>
                        SAVE PRODUCT
                    </Button>
                </form>
            </div>
        </Box>
    );
    }
};

export default AddProduct;
