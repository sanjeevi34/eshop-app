import React, {useState} from 'react';
import {Box,Typography} from "@mui/material";
import { TextField, Button, Container, Stack, Avatar } from '@mui/material';
import { Link } from "react-router-dom"
import { pink } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from "@mui/icons-material/Lock";

import styles from './SignUp.css';

import NavBar from '../NavBar/NavBar.js';

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState('');

    async function signUpSubmit(firstName, lastName, email, password, mobile) {
        const params = {
            email: email,
            role: [
                "user"
            ],
            password: password,
            firstName: firstName,
            lastName: lastName,
            contactNumber: mobile
        }

        try {
            const rawResponse = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
                }
            });

            const result = await rawResponse.json();

            if(rawResponse.ok) {
                window.location.href = './login';
                //alert('Form Submitted');
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }

    const handleSubmit = (event) => {
          event.preventDefault();
          if (password !== confirmPassword) {
            setError('Passwords do not match');
            alert('Passwords do not match');
          } else {
            setError('');
            signUpSubmit(firstName, lastName, email, password, mobile);
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
                    width: '400px', margin: 'auto' }}>
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
                        Sign up
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                        sx={{mb: 3}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                        sx={{mb: 3}}
                    />
                    <TextField
                        type="email"
                        variant='outlined'
                        color='primary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{mb: 3}}
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='primary'
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{mb: 3}}
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='primary'
                        label="Confirm Password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        fullWidth
                        sx={{mb: 3}}
                    />
                    <TextField
                        type="tel"
                        variant='outlined'
                        color='primary'
                        label="Contact Number"
                        onChange={e => setMobile(e.target.value)}
                        value={mobile}
                        required
                        fullWidth
                        sx={{mb: 3}}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{bgcolor: '#3f51b5'}}>SIGN UP</Button>
                </form>
                <div style={{display: 'flex', justifyContent:'flex-end', padding: '20px 0 0 0'}}>
                    <small><Link to="/login">Already have an account? Sign in</Link></small>
                </div>
            </div>

        </React.Fragment>
    )
}

export default SignUp;