import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
  Grid
} from '@mui/material';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";


const Testing = ({ product }) => {
    const accessToken = window.sessionStorage.getItem('access-token');
    const apiUrl = 'http://localhost:8080/api/addresses';

/*    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    fetch(apiUrl, { method: 'GET', headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    return (
        <Button>Test</Button>
    );*/

      //PUT API
      /*const apiUrl2 = 'http://localhost:8080/api/addresses/64cf47ed7ceea16637d95546'; // Replace with the specific resource URL

      const headers3 = new Headers();
      headers3.append('Authorization', `Bearer ${accessToken}`);
      headers3.append('Content-Type', 'application/json');

      const requestBody = {
        id: "64cf47ed7ceea16637d95546",
        name: "string",
        contactNumber: "string",
        city: "string",
        landmark: "string",
        street: "string",
        state: "string",
        zipcode: "string",
        user: "name11@gmail.com"
      };

      fetch(apiUrl2, {
        method: 'PUT',
        headers3,
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });*/


/*
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
            console.log(data);
          })
          .catch(error => {
            console.error("Not admin");
          });*/


        //const { searchText, onSearchChange } = props;
        return (
            <Box>Testing</Box>
        );


};

export default Testing;
