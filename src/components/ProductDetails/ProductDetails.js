import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import NavBar from '../NavBar/NavBar.js';
import { useAuth } from '../../common/Contexts/AuthContext';
import { Box, Container, Divider, Paper, Grid, Typography, TextField, Button, NativeSelect, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams
import ProductCategories from '../ProductCategories/ProductCategories.js';

// List of steps should be displayed in the Stepper Menu
const steps = ['Items', 'Select Address', 'Confirm Order'];

const ProductDetails = () => {
    const { productName,  quantity} = useParams();

    // Use AuthContext
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin, orderPlaced,  setOrderPlaced} = useAuth();

    // Local states
    const [product, setProduct]                         = useState(null);
    const [categories, setCategories]                   = useState(null);      // Category
    const [selectedCategory, setSelectedCategory]       = useState('All');     // Category selection
    const [snackbarOpen, setSnackbarOpen]               = useState(false);     // Snack bar for next button
    const [snackbarOpenAddr, setSnackbarOpenAddr]       = useState(false);     // Snack bar for address
    const [snackbarOpenAddAddr, setSnackbarOpenAddAddr] = useState(false);     // Snack bar for wrong address fields
    const [selectedAddress, setSelectedAddress]         = useState('');
    //Add address
    const [name, setName]                         = useState();
    const [number, setNumber]                     = useState();
    const [street, setStreet]                     = useState();
    const [city, setCity]                         = useState();
    const [state, setState]                       = useState();
    const [landmark, setLandmark]                 = useState("");
    const [zipcode, setZipcode]                   = useState();
    // Address Option selected
    const [option, setOptions]                    = useState([{ value: 0, label: '' }]);
    // To store all the address from the API call
    const [allAddress, setAllAddress]             = useState();
    // To display the selected address
    const [displayAddress, setDisplayAddress]     = useState();

    // To Navigate the pages.
    const history = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    const handleSelectCategory = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    // Async function to get all the address from the backend using GET API call.
    async function getAllAddress()  {
        //GET API addresses
        const apiUrl4 = "http://localhost:8080/api/addresses";
        const headers = new Headers();
        const accessToken   = window.sessionStorage.getItem('access-token');
        headers.append('Authorization', `Bearer ${accessToken}`);
        headers.append("x-auth-token", accessToken);

        fetch(apiUrl4, { method: 'GET', headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                const user_id   = window.sessionStorage.getItem('admin-id');
                const finalObj = data.filter((data) => {
                    console.log(data);
                    return data.user == user_id;
                });
                const newObj = finalObj.map((data) => ({
                    value: data.id,
                    label: data.name + '--> ' + data.street + ", " + data.city,
                }));

                setOptions(newObj);
                //console.log(newObj);
                setAllAddress(data);
            })
            .catch(error => {
                console.error("Not admin");
            });
    }

    // Use effect method to update the address when the allAddress or selectedAddress changes.
    useEffect( () => {
        if(Array.isArray(allAddress))
        {
            allAddress.forEach( (v) => {
                //console.log(v.id);
                //console.log(selectedAddress);
                if(v.id == selectedAddress) {
                    //console.log(v);
                    const addr = {
                        name: v.name,
                        number: v.contactNumber,
                        street: v.street,
                        city: v.city,
                        state: v.state,
                        zipcode: v.zipcode
                    }
                    console.log(addr);
                    setDisplayAddress(addr);
                }
            });
        }
    },[allAddress, selectedAddress]);

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

            getAllAddress();
    }, []);

    // Async function to call place the order POST API to the backend.
    async function placeOrderTobe () {
        const addAddressUrl = 'http://localhost:8080/api/orders';
        const accessToken   = window.sessionStorage.getItem('access-token');
        const adminId   = window.sessionStorage.getItem('admin-id');
        const headers = {
                            "x-auth-token": accessToken,
                            'Authorization': `Bearer ${accessToken}`,
                            'Accept': "application/json",
                            'Content-Type': "application/json",
        }

        const requestBody = {
            id: '12457859',
            quantity: quantity,
            user: adminId,
            product: productName,
            address: selectedAddress,
        };
        console.log(requestBody);
        fetch(addAddressUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(data => {
                console.log("PLACE ORDER")
                console.log(data);
                setOrderPlaced(true);
                navigateTo('/products');
            })
            .catch(error => {
                console.error('Not able to order', error);
            });
    }

    /*----<Stepper Menu>-----*/
    const [activeStep, setActiveStep] = useState(0);
    const [nextButton, setNextButton] = useState("NEXT");

    useEffect(() => {
        if(activeStep == 2)
        {
            setNextButton("PLACE ORDER");
        }
        else
        {
            setNextButton("NEXT");
        }
    },[activeStep]);

    const handleNext = () => {
        //console.log(activeStep)
        //console.log(selectedAddress)
        if(activeStep == 1 && selectedAddress == 0)
        {
            setSnackbarOpen(true);
            //alert("Select an address");
            return;
        }
        if(activeStep < 2)
        {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else
        {
            //Do Place Order
            placeOrderTobe();
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarCloseAddr = () => {
        setSnackbarOpenAddr(false);
    };

    const handleSnackbarAddAddr = () => {
        setSnackbarOpenAddAddr(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        //console.log(activeStep);
    };

    const handleOptionChange = (event) => {
        setSelectedAddress(event.target.value);
        console.log(event.target.value);
    };

    async function addAddressToBe() {
        const addAddressUrl = 'http://localhost:8080/api/addresses';
        const accessToken   = window.sessionStorage.getItem('access-token');
        const adminId   = window.sessionStorage.getItem('admin-id');
        const headers = {
                            "x-auth-token": accessToken,
                            'Authorization': `Bearer ${accessToken}`,
                            'Accept': "application/json",
                            'Content-Type': "application/json",
        }

        const requestBody = {
            id: '552145',
            name: name,
            contactNumber: number,
            city: city,
            landmark: landmark,
            street: street,
            state: state,
            zipcode: zipcode,
            user: adminId
        };

        //console.log(requestBody);

        fetch(addAddressUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(data => {
                console.log(data);
                setName(null);
                setNumber(null);
                setStreet(null);
                setCity(null);
                setState(null);
                setLandmark(null);
                setZipcode(null);
                setSnackbarOpenAddr(true);
                getAllAddress();
            })
            .catch(error => {
                setSnackbarOpenAddAddr(true);
                console.error('Not able to add the address', error);
            });
    }

    const handleSaveAddress = (event) => {
        event.preventDefault();
        try {
            addAddressToBe();
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }

    const getStepContent = step => {
        switch (step) {
            case 0: //Product Details
                return (
                    <Box>
                        <Box sx={{pb:1}}/>
                        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ pt: 2}}>Category: <b>{product.category}</b></Typography>
                                    <Typography variant="subtitle1" sx={{ pt: 2}}>Quantity: {quantity}</Typography>
                                    <Typography variant="body1" sx={{ pt: 2}}>{product.description}</Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                );
            case 1:  // Select and Add Address
                return (
                    /* Content for the "Select Address" step */
                    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                                Please select address!
                            </MuiAlert>
                        </Snackbar>
                        <Snackbar open={snackbarOpenAddr} autoHideDuration={1500} onClose={handleSnackbarCloseAddr} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarCloseAddr} severity="success">
                                Address added successfully!
                            </MuiAlert>
                        </Snackbar>
                        <Snackbar open={snackbarOpenAddAddr} autoHideDuration={1500} onClose={handleSnackbarAddAddr} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarAddAddr} severity="error">
                                Give proper address fields!
                            </MuiAlert>
                        </Snackbar>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Select Address
                        </InputLabel>
                        <NativeSelect sx={{ width: '150%' }}
                            onChange={handleOptionChange}
                            defaultValue={0}
                            inputProps={{
                              name: 'age',
                              id: 'uncontrolled-native',
                            }}
                            value={selectedAddress}
                        >
                            <option key={0} value=""></option>
                            {option.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </NativeSelect>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center', // Center vertically
                                minHeight: '60vh', // Adjust height to fill the viewport
                                padding: '20px',
                                width: '400px', margin: 'auto' }}>
                            <Typography variant="body1" sx={{ marginBottom: 3}}>-OR-</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 3}}>Add Address</Typography>
                            <form onSubmit={handleSaveAddress}>
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
                                <TextField
                                    type="tel"
                                    variant='outlined'
                                    color='primary'
                                    label="Contact Number"
                                    onChange={e => setNumber(e.target.value)}
                                    value={number}
                                    fullWidth
                                    required
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    label="Street"
                                    onChange={e => setStreet(e.target.value)}
                                    value={street}
                                    fullWidth
                                    required
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    label="City"
                                    onChange={e => setCity(e.target.value)}
                                    value={city}
                                    required
                                    fullWidth
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    label="State"
                                    onChange={e => setState(e.target.value)}
                                    value={state}
                                    required
                                    fullWidth
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    label="Landmark"
                                    onChange={e => setLandmark(e.target.value)}
                                    value={landmark}
                                    fullWidth
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    label="Zip Code"
                                    onChange={e => setZipcode(e.target.value)}
                                    value={zipcode}
                                    fullWidth
                                    required
                                    sx={{mb: 2}}
                                />
                                <Button variant="contained" color="primary" type="submit" fullWidth sx={{bgcolor: '#3f51b5'}}>SAVE ADDRESS</Button>
                            </form>
                        </div>
                    </Container>
                );
            case 2:
                return (
                    /* Content for the "Confirm Order" step */
                    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Paper elevation={3} style={{ display: 'flex', padding: '8%', paddingBottom: '12%' }} sx={{ width: '98%' }}>
                            <Grid container spacing={3} justifyContent="space-between">
                                {/* Left Side (Product Details) */}
                                <Grid item xs={7} align="left" container direction="column">
                                    <Typography variant="h4" sx={{mb: 1}}>{product.name}</Typography>
                                    <Typography variant="subtitle1" sx={{mb: 1}}>Quantity: <b>{quantity}</b></Typography>
                                    <Typography variant="subtitle1" sx={{mb: 1}}>Category: {product.category}</Typography>
                                    <Typography variant="body1" sx={{mb: 1}}><i>{product.description}</i></Typography>
                                    <Typography color="error" variant="h6">Total Price: {'₹ ' + product.price * quantity}</Typography>
                                </Grid>

                                {/* Vertical Line */}
                                <Divider orientation="vertical" flexItem />

                                {/* Right Side (User Address) */}
                                <Grid xs={4} container direction="column" align="left" sx={{pt: 3}}>
                                    <Typography variant="h4" sx={{mb: 1}}>Address Details :</Typography>
                                    <Typography>{displayAddress.name}</Typography>
                                    <Typography>Contact Number: {displayAddress.number}</Typography>
                                    <Typography>{displayAddress.street + ", " + displayAddress.city}</Typography>
                                    <Typography>{displayAddress.state}</Typography>
                                    <Typography>{displayAddress.zipcode}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                );
            default:
                return null;
        }
    };
/*----->Stepper Menu<-----*/

    if(signedIn == true) {
        if(product == null)
        {
            return (
                <NavBar loggedIn={true} isAdmin={isAdmin}/>
            )
        }
        else {
            return (
                <Box>
                    <NavBar loggedIn={true} isAdmin={isAdmin}/>
                    <Box sx={{marginBottom:5}}></Box>
                <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper sx={{ width: '100%' }}>
                        <Box p={1}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Paper>
                    <div style={{ marginTop: '20px' }}>
                        {getStepContent(activeStep)}
                    </div>
                    <div style={{ marginTop: '2%', marginBottom: '10%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button disabled={activeStep === 0} onClick={handleBack} sx={{pr:3}}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={activeStep === steps.length}
                            sx={{bgcolor: '#3f51b5'}}
                        >
                            {nextButton}
                        </Button>
                    </div>
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