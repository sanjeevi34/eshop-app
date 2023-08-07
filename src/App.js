import logo from './logo.svg';
import './App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import NavBar from './components/NavBar/NavBar.js';
import SignUp from './components/SignUp/SignUp.js'

function App() {
  return (
    <div className="App">
        <NavBar/>
        <SignUp/>
    </div>
  );
}

export default App;
