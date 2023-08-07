import React, {useState} from "react";
import { Box, Typography, TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom"
import { pink } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import NavBar from '../NavBar/NavBar.js';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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
            console.log(email, password)
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