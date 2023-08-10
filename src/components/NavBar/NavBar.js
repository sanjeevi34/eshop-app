import { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import Button from '@mui/material-next/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Container, InputAdornment, TextField, makeStyles } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { useHistory } from 'react-router-dom'; // Import useHistory
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Grid
} from "@mui/material";
import styles from './NavBar.css';

import { useAuth } from '../../Contexts/AuthContext';

const NavBar = (props) => {

    const { authUser,
            setAuthUser,
            signedIn,
            setSignedIn } = useAuth();

    const [user, setUser] = useState(null);

//    useEffect(() => {
//        { /*
//            setInterval was used in order to refresh the page constantly
//            in order to have the "logout" button show immediately in place of
//            "login", as soon as user logs out.*/
//        }
//        setInterval(() => {
//            const userString = localStorage.getItem("user");
//            const user = JSON.parse(userString);
//            setUser(user);
//            }, [])
//    }, 5000);


//    const logout = () => {
//        return localStorage.removeItem("user");
//    }

    const history = useHistory(); // Get the history object

    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    const loggingOut = () => {
        setSignedIn(false);
        window.sessionStorage.removeItem('access-token');
        navigateTo('/');
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        props.searchDataCallBack(event.target.value);
    };

    if (!props.loggedIn) {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        align="left"
                        sx={{ flexGrow: 1}}
                    >
                        upGrad E-Shop
                    </Typography>

                    <Link
                      component="button"
                      variant="h6"
                      sx={{color: 'white', pr: 4}}
                      onClick={() => navigateTo('/login')}
                    >
                      Login
                    </Link>
                    <Link
                      component="button"
                      variant="h6"
                      sx={{color: 'white', pr: 2}}
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
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        align="left"
                        sx={{ flexGrow: 1}}
                    >
                        upGrad E-Shop
                    </Typography>

                    <TextField
                      placeholder="Search..."
                      variant="filled"
                      sx={{ flex: 1, pr:30, pl:30}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'center' }}>
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                    />

                    <Link
                      component="button"
                      variant="h6"
                      sx={{color: 'white', pr: 4}}
                    >
                      Home
                    </Link>

                    <Link
                      component="button"
                      variant="h6"
                      sx={{color: 'white', pr: 4}}
                    >
                      Add Product
                    </Link>
                    <Button variant="contained" color="secondary" onClick={() => loggingOut()}>
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}


export default NavBar;