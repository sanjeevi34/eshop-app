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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

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

const Testing = ({ product }) => {
    const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNjkxODM3OTUxLCJleHAiOjE2OTE4NDYzNTF9.ykI2uY43B8CqIRW_ORGSDKdJxxB6vgFSVcU1oeTl8-KwKfU0tpqgQuLbJ_viIrzo3sNZhJE5wZaqVo8hrOV0Dw';
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

    //POST API
/*    const apiUrl1 = 'http://localhost:8080/api/addresses';
    const headers1 = new Headers();
    headers1.append('Authorization', `Bearer ${accessToken}`);
    headers1.append('Content-Type', 'application/json');

    const requestBody = {
      id: '64cf43802d20a24bada8977a',
      name: 'Random1Address',
      contactNumber: '5412563587',
      city: 'Bangalore',
      landmark: 'Skl Road',
      street: 'Kamaraj Street',
      state: 'Karnataka',
      zipcode: '560066',
      user: 'name11@gmail.com'
    };

    fetch(apiUrl1, {
      method: 'POST',
      headers1,
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
        <Grid item xs={3} sx={{bgcolor: '#3f51b5'}}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                defaultValue="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            </Grid>
        );


};

export default Testing;
