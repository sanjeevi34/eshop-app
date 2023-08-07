import { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import Button from '@mui/material-next/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom'; // Import useHistory
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from './NavBar.css';

const NavBar = (props) => {

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
    if (!props.loggedIn) {
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

                    <Link
                      component="button"
                      variant="h6"
                      sx={{color: 'white', pr: 4}}
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
                        Home
                    </Typography>

                    <Link
                      component="button"
                      variant="h6"
                      sx={{color: 'white', pr: 4}}
                    >
                      Add Product
                    </Link>
                    <Button variant="contained" color="secondary">
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}


export default NavBar;