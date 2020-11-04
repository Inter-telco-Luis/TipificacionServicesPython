import React, { Component } from 'react';
//import logo from './assets/images/inter-telco.png';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Datosjson from './components/Uploadfile/Datosjson';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

const ViewDatos = ()=>(
  <Datosjson />
);

class App extends Component {


  render() {
  
    return (
      
      <Router>
        <Switch>
        <Route exact path="/" component={ViewDatos} />           
        <Route path="*" component={() => "404 NOT FOUND"} /> 
        </Switch>
      </Router>
    
   );
  }
}



export default App;
