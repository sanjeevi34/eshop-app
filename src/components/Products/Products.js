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
            <NavBar/>
            Signed In
            </div>
        )
    }
    else {
        return (
            <div>
            <NavBar/>
            Not Signed In
            </div>
        )
    }
}

export default Products;