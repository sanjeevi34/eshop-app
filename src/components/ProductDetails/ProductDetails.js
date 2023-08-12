import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import NavBar from '../NavBar/NavBar.js';
import { useAuth } from '../../Contexts/AuthContext';
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

//const product = {
//                    id: 1,
//                    name: 'OnePlus8T',
//                    price: 50000,
//                    category: 'Electronics',
//                    imageUrl: 'https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png', // Replace with actual image URL
//                    description: 'OnePlus phones are premium Android smartphones known for their powerful performance.',
//                };

const steps = ['Items', 'Select Address', 'Confirm Order'];

const ProductDetails = () => {
    const { productName,  quantity} = useParams();
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin } = useAuth();
    const [ product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);      // Category
    const [selectedCategory, setSelectedCategory] = useState('All');     // Category selection

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState('');
//Add address
    const [name, setName] = useState();
    const [number, setNumber] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [landmark, setLandmark] = useState();
    const [zipcode, setZipcode] = useState();

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
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //console.log(activeStep);
  };

  const handleOptionChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
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
      case 1:
        return (
          /* Content for the "Select Address" step */
          <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                                  Please select address!
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
              <option value={0}></option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
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
                <Button variant="contained" color="primary" type="submit" fullWidth>SAVE ADDRESS</Button>
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
            <Typography>{name}</Typography>
            <Typography>Contact Number: {number}</Typography>
            <Typography>{street + ", " + city}</Typography>
            <Typography>{state}</Typography>
            <Typography>{zipcode}</Typography>
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

if(signedIn == true) {  // Should make this true by default @todo
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