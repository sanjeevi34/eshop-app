import logo from './logo.svg';
import './App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './Contexts/AuthContext'
//Import components
import { useAuth } from './Contexts/AuthContext.js'
import Products from './components/Products/Products.js'
import LogIn from './components/LogIn/LogIn.js'
import SignUp from './components/SignUp/SignUp.js'
import NavBar from './components/NavBar/NavBar.js'
import ProductDetails from './components/ProductDetails/ProductDetails.js'
import ProductDetailsWithoutStepper from './components/ProductDetailsWithouStepper/ProductDetailsWithoutStepper.js'
import StepperMenu from './components/StepperMenu/StepperMenu.js'
import Testing from './components/Testing/Testing.js'
import AddProduct from './components/AddProduct/AddProduct.js'
import ModifyProduct from './components/ModifyProduct/ModifyProduct.js'

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={NavBar} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/products" component={Products}/>
                    <Route path="/productStepper/:productName/:quantity" component={ProductDetails}/>
                    <Route path="/stepper" component={StepperMenu}/>
                    <Route path="/product/:productName" component={ProductDetailsWithoutStepper}/>
                    <Route path="/testing" component={Testing}/>
                    <Route path="/addProduct" component={AddProduct}/>
                    <Route path="/modifyProduct" component={ModifyProduct}/>
                </Switch>
            </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
