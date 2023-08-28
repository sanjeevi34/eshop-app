// Importing other components
import NavBar from '../NavBar/NavBar.js'; //Don't change this position

import { useHistory } from 'react-router-dom'; // Import useHistory

import { useAuth } from '../../common/Contexts/AuthContext';

const Home = () => {

    // AuthContext
    const { authUser,
            setAuthUser,
            signedIn,
            setSignedIn,
            isAdmin,
            setIsAdmin} = useAuth();

    // Support functions to navigate to other pages of the website.
    const history    = useHistory(); // Get the history object
    const navigateTo = (path) => {
        history.push(path); // Use history.push to navigate to the specified path
    };

    if(signedIn == true) {
        navigateTo('/products')
    } else {
        navigateTo('/login');
    }

    return (
        <NavBar/>
    );
}

export default Home;