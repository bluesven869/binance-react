import React from 'react';
import './App.css';
import MenuAppBar from './components/header/menu-app-bar';
import Box from '@material-ui/core/Box';

import Home from './pages/home/home';
import Exchange from './pages/exchange/exchange';
import Markets from './pages/markets/markets';

import {
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Box height="100%" className="paddingTop-50">
        
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/exchange"><Exchange /></Route>
            <Route path="/markets"><Markets /></Route>
          </Switch>
      </Box>
    </div>
  );
}

export default App;
