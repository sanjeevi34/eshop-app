import React from 'react';
import { useState, useEffect } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom"
import { useAuth } from '../../Contexts/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory

// Delete Button With Modal local component used only for Product Card
const DeleteButtonWithModal = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Async function to call the delete product DELETE API to the backend
    async function deleteApi ( id ) {
        const accessToken = window.sessionStorage.getItem('access-token');
        const apiUrl4 = "http://localhost:8080/api/products/" + id;
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);
        fetch(apiUrl4, { method: 'DELETE', headers })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(data => {
                console.log(data);
                props.snackBar(true);

                setTimeout(()=>{
                    props.setRefetchData(true)
                } , 2000);
            })
            .catch(error => {
                console.error("Error: " + error);
            });
    }

    const handleDelete = () => {
        // Perform delete operation.
        // Adding the delete logic here
        // console.log(props.id)
        // Close the modal
        deleteApi(props.id);
        handleClose();
    };

    return (
        <Box style={{display: 'inline-block'}}>
            <IconButton aria-label="delete" onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm deletion of product!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleDelete} sx={{bgcolor: '#3f51b5'}}>
                        OK
                    </Button>
                    <Button variant="outlined" onClick={handleClose} sx={{color: '#3f51b5'}}>
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

// Product Card main component used in products page along with props
const ProductCard = ({ product, setRefetchData }) => {

    // Use AuthContext
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin } = useAuth();

    // Support functions to navigate to other pages of the website.
    const history    = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    // Snack bar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Edit Icon button handle
    const editIconHandle = () => {
        navigateTo('/modifyProduct/' + product.id);
    }

    // Rendering
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                    Product {product.name} deleted successfully
                </MuiAlert>
            </Snackbar>
            <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.imageUrl}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="h6">
                        {'₹' + product.price}
                    </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ pt:1 }} align="left" container direction="column">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Link to={"/product/" + product.id}>
                    <Button variant="contained" size="small" color="primary" sx={{bgcolor: '#3f51b5'}}>
                        Buy
                    </Button>
                </Link>
                {   isAdmin &&
                    <Box sx={{ marginLeft: 'auto' }}>
                        <IconButton aria-label="edit" onClick={() => editIconHandle()}>
                            <EditIcon />
                        </IconButton>
                        <DeleteButtonWithModal id={product.id} snackBar={setSnackbarOpen} setRefetchData={setRefetchData}/>
                    </Box>
                }
            </CardActions>
        </Card>
    );
};

export default ProductCard;
