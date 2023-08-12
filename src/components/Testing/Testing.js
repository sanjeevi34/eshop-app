import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box
} from '@mui/material';


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
          });
        return (
            <Button>Test</Button>
        );


};

export default Testing;
