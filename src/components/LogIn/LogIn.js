import React, {useState} from "react";
import { Box, Typography, TextField, FormControl, Button, Snackbar } from "@mui/material";
import { Link } from "react-router-dom"
import { pink } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MuiAlert from '@mui/material/Alert';

import { useAuth } from '../../Contexts/AuthContext';

import NavBar from '../NavBar/NavBar.js'; //Don't change this position

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom'; // Import useHistory

const LogIn = () => {
    const {         authUser,
                    setAuthUser,
                    signedIn,
                    setSignedIn,
                    isAdmin,
                    setIsAdmin} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const history = useHistory(); // Get the history object

    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    async function login(email, password) {
        //const param = window.btoa(`${email}:${password}`);
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
                //window.sessionStorage.setItem('user-details', JSON.stringify(result));
                //console.log(result.token);
                window.sessionStorage.setItem('access-token', result.token);
                //window.location.href = './boards.html';

                /*Check whether it is the admin who logged in*/
                    const accessToken = result.token;
                    const apiUrl4 = "http://localhost:8080/api/users";
                    const headers = new Headers();
                    headers.append('Authorization', `Bearer ${accessToken}`);

                    fetch(apiUrl4, { method: 'GET', headers })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error('Network response was not ok');
                        }
                        return response.json();
                      })
                      .then(data => {
                        //console.log(data);
                        setIsAdmin(true);
                      })
                      .catch(error => {
                        //console.error("Not admin");
                        setIsAdmin(false);
                      });
                /*-------------------*/

                setSignedIn(true);
                //alert('Logged in successfully');
                navigateTo('/products');
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
            }
        } catch(e) {
            //alert(`Error: ${e.message}`);
            //alert('Email Address or Password is incorrect');
            setSnackbarOpen(true);
        }
    }

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
                {/*<Box display="flex"      sx={{
                             borderRadius: '50%',
                             width: 50,
                             height: 50,
                             backgroundColor: pink[600],
                           }}>
                           */}
                    <LockOutlinedIcon fontSize="large" sx={{ color: pink[500] }}/>
                {/*</Box>*/}
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
                <Button variant="contained" color="primary" type="submit" fullWidth>SIGN IN</Button>
            </form>
            <div style={{display: 'flex', justifyContent:'flex-start', padding: '20px 0 0 0'}}>
                <small><Link to="/signup">Don't have an account? Sign up</Link></small>
            </div>
        </div>
        </React.Fragment>
     );
}

export default LogIn;