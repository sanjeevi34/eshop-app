import NavBar from '../NavBar/NavBar.js';

import { useAuth } from '../../Contexts/AuthContext';

import { useHistory } from 'react-router-dom'; // Import useHistory


const Products = () => {
    const {         authUser,
                    setAuthUser,
                    signedIn,
                    setSignedIn } = useAuth();

    const history = useHistory(); // Get the history object

    const navigateTo = (path) => {
    history.push(path); // Use history.push to navigate to the specified path
    };

    if(signedIn == true) {
        return (
            <div>
            <NavBar loggedIn={true}/>
            Signed In
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