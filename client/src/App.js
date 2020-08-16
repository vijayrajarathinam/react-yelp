import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import reference

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import Detail from './components/Detail';
import Update from './components/Update';
import { RestaurantContextProvider } from './context/RestaurantContext';


const App = () => {
  
  return (
    <RestaurantContextProvider>
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/restaurants/:id" component={Detail} />
      <Route exact path="/restaurants/:id/update" component={Update} />
      </Switch>
    </Router>
    </RestaurantContextProvider>
  );
}


export default App;
