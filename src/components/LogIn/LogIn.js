import React, {useState} from "react";
import { Box, Typography, TextField, FormControl, Button, Snackbar, Avatar } from "@mui/material";
import { Link } from "react-router-dom"
import { pink } from '@mui/material/colors';
import MuiAlert from '@mui/material/Alert';
import LockIcon from "@mui/icons-material/Lock";

import { useAuth } from '../../Contexts/AuthContext';

// Importing other components
import NavBar from '../NavBar/NavBar.js'; //Don't change this position

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom'; // Import useHistory

// Import stylesheets for Login page
import "./Login.css";

// Login component
const LogIn = () => {

    // AuthContext
    const { authUser,
            setAuthUser,
            signedIn,
            setSignedIn,
            isAdmin,
            setIsAdmin} = useAuth();

    // Local States
    // Login details and support states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose             = () => {
                                                setSnackbarOpen(false);
                                            };

    // Support for navigation to other webpages.
    const history = useHistory(); // Get the history object

    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    // Async function to call login POST API to the backend
    async function login(email, password) {
        // params is the request payload for the POST API call
        const params = {
            username: email,
            password: password
        }
        try {
            const rawResponse = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
                }
            });

            const result = await rawResponse.json();
            if(rawResponse.ok) {
                //console.log(rawResponse.headers.get("x-auth-token"));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get("x-auth-token"));
                //window.sessionStorage.setItem('access-token', result.token);
                console.log(result.token);
                if(result.roles[0] == "ADMIN") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                window.sessionStorage.setItem('admin-id', result.id);

                //window.sessionStorage.setItem('access-token', rawResponse.headers.get('X-Auth-Token'));
                //console.log(rawResponse);
                /*Check whether it is the admin who logged in*/
//                const accessToken = result.token;
//                const apiUrl4 = "http://localhost:8080/api/users";
//                const headers = new Headers();
//                headers.append('Authorization', `Bearer ${accessToken}`);
//
//                fetch(apiUrl4, { method: 'GET', headers })
//                    .then(response => {
//                        if (!response.ok) {
//                            throw new Error('Network response was not ok');
//                        }
//                        return response.json();
//                  })
//                    .then(data => {
//                        console.log(data);
//                        const output = (data.filter((value) => {
//                            return value.email === email
//                        }))
//                        window.sessionStorage.setItem('admin-id', output[0].id);
//
//                        setIsAdmin(true);
//                    })
//                      .catch(error => {
//                            //console.error("Not admin");
//                            setIsAdmin(false);
//                            console.log(error); //To remove @todo
//                      });
                /*-------------------*/

                setSignedIn(true);
                //alert('Logged in successfully');
                navigateTo('/products');
            } else {
                const error   = new Error();
                error.message = result.message || 'Something went wrong.';
            }
        } catch(e) {
            //alert(`Error: ${e.message}`);
            //alert('Email Address or Password is incorrect');
            console.log(e); //To remove @todo
            setSnackbarOpen(true);
        }
    }

    // Function to handle the submit of the login form
    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
        if (email && password) {
            login(email, password);
        }
    }

    return (
        <React.Fragment>
        <NavBar loggedIn={false}/>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center vertically
                minHeight: '75vh', // Adjust height to fill the viewport
                padding: '20px',
                width: '400px', height: '300px', margin: 'auto' }}>
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} style={{ marginTop: '70px' }}>
                      <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                        Email Address or Password is incorrect
                      </MuiAlert>
            </Snackbar>
            <Box>
                <Avatar className="avatarStyle">
                    <LockIcon />
                </Avatar>
                <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{ flexGrow: 1, pb: 4}}
                >
                    Sign in
                </Typography>
            </Box>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    label="Email Address"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{bgcolor: '#3f51b5'}}>SIGN IN</Button>
            </form>
            <div style={{display: 'flex', justifyContent:'flex-start', padding: '20px 0 0 0'}}>
                <small><Link to="/signup">Don't have an account? Sign up</Link></small>
            </div>
        </div>
        </React.Fragment>
     );
}

export default LogIn;