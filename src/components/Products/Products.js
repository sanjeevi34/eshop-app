import NavBar from '../NavBar/NavBar.js';

import { useAuth } from '../../Contexts/AuthContext';
import { Container, Grid } from '@mui/material';

import ProductCard from '../ProductCard/ProductCard.js';
import { useHistory } from 'react-router-dom'; // Import useHistory

const products = [
  {
    id: 1,
    name: 'OnePlus8T',
    price: '₹ 50,000',
    image: 'https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png', // Replace with actual image URL
    description: 'OnePlus phones are premium Android smartphones known for their powerful performance.',
  },
  // Add more product objects as needed
];

const Products = () => {
    const {         authUser,
                    setAuthUser,
                    signedIn,
                    setSignedIn } = useAuth();

    const history = useHistory(); // Get the history object

    const navigateTo = (path) => {
    history.push(path); // Use history.push to navigate to the specified path
    };

    if(signedIn == false) {  //Change this condition to true
        return (
            <div>
            <NavBar loggedIn={true}/>
            Signed In
                <Container>
                  <Grid container spacing={3}>
                    {products.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                </Container>
            </div>
        )
    }
    else {
//        return (
//            <div>
//            <NavBar loggedIn={false}/>
//            Not Signed In
//            </div>
//        )
      navigateTo('/login');
    }
}

export default Products;