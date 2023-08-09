import NavBar from '../NavBar/NavBar.js';

import { useAuth } from '../../Contexts/AuthContext';

const Products = () => {
    const {         authUser,
                    setAuthUser,
                    signedIn,
                    setSignedIn } = useAuth();

    if(signedIn == true) {
        return (
            <div>
            <NavBar loggedIn={true}/>
            Signed In
            </div>
        )
    }
    else {
        return (
            <div>
            <NavBar loggedIn={false}/>
            Not Signed In
            </div>
        )
    }
}

export default Products;