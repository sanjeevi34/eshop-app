import { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, InputAdornment, TextField, makeStyles } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import { useHistory } from 'react-router-dom'; // Import useHistory
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Grid,
    Button
} from "@mui/material";

import { useAuth } from '../../Contexts/AuthContext';

// Search component for navbar
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "75%",
}));

// Search Icon Wrapper for Search component in Navbar
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

// Styled Input Base for the search bar inside the Navbar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const NavBar = (props) => {

    // Use AuthContext
    const { authUser, setAuthUser, signedIn, setSignedIn, isAdmin, setIsAdmin} = useAuth();

    // Local states
    const [user, setUser] = useState(null);

    // Support needed to navigate to different webpage.
    const history    = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    const loggingOut = () => {
        setSignedIn(false);
        setIsAdmin(false);
        window.sessionStorage.removeItem('access-token');
        window.sessionStorage.removeItem('admin-id');
        navigateTo('/');
    };

    // Home button click event
    const homeClicked = () => {
        navigateTo('/products');
    };

    // Add Product button click event
    const addProduct = () => {
        navigateTo('/addProduct');
    };

    // Search bar support states and functions
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if(props.searchEnable == true)
        {
            props.searchDataCallBack(event.target.value);
        }
    };

    // Rendering based on user logged in or not
    if (!props.loggedIn) {
        return (
            <AppBar position="static" sx={{bgcolor: '#3f51b5'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography
                        variant="body1"
                        component="div"
                        align="left"
                        sx={{ flexGrow: 1}}
                    >
                        upGrad E-Shop
                    </Typography>

                    <Link
                        component="button"
                        variant="body1"
                        sx={{color: 'white', pr: 4, textDecoration: 'underline',}}
                        onClick={() => navigateTo('/login')}
                    >
                      Login
                    </Link>
                    <Link
                        component="button"
                        variant="body1"
                        sx={{color: 'white', pr: 2, textDecoration: 'underline'}}
                        onClick={() => navigateTo('/signup')}
                    >
                        Sign Up
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
    if (props.loggedIn) {
        return (
             <AppBar position="static" sx={{bgcolor: '#3f51b5'}}>
                 <Toolbar>
                     <Grid container spacing={2}>
                         <Grid item xs={5} alignItems="left">
                             <Typography align="left">
                                 <IconButton
                                     size="small"
                                     edge="start"
                                     color="inherit"
                                     aria-label="menu"
                                     disableRipple
                                 >
                                     <ShoppingCartIcon sx={{pr:1}}/>
                                     <Typography variant="body1" component="span" align="left">
                                         upGrad E-Shop
                                     </Typography>
                                 </IconButton>
                            </Typography>
                         </Grid>
                         <Grid item xs={3}>
                             <Search>
                                 <SearchIconWrapper>
                                     <SearchIcon />
                                 </SearchIconWrapper>
                                 <StyledInputBase
                                     placeholder="Search..."
                                     inputProps={{ "aria-label": "search" }}
                                     onChange={handleChange}
                                 />
                             </Search>
                         </Grid>
                         <Grid item xs={4} textAlign={"right"} justifyContent="flex-end">
                             <Link
                                 component="button"
                                 variant="body1"
                                 sx={{color: 'white', pr: 4, textDecoration: 'underline'}}
                                 onClick={() => homeClicked()}
                             >
                                 Home
                             </Link>
                             {   props.isAdmin &&
                                 <Link
                                     component="button"
                                     variant="body1"
                                     sx={{color: 'white', pr: 4, textDecoration: 'underline'}}
                                     onClick={() => addProduct()}
                                 >
                                     Add Product
                                 </Link>
                             }
                             <Button variant="contained" color="error" onClick={() => loggingOut()}>
                                 LOGOUT
                             </Button>
                         </Grid>
                    </Grid>
                 </Toolbar>
             </AppBar>
        )
    }
}

export default NavBar;