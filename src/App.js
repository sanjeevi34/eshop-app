import logo from './logo.svg';
import './App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import SignUp from './components/SignUp/SignUp.js'
import NavBar from './components/NavBar/NavBar.js'

function App() {
  return (
    <div className="App">
        <SignUp/>
    </div>
  );
}

export default App;
