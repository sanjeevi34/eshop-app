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

//Import components
import SignUp from './components/SignUp/SignUp.js'
import NavBar from './components/NavBar/NavBar.js'

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={NavBar} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
