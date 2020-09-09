import React from 'react';
import { Entities } from './views/Entities';
import { Assets } from './views/Assets';
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
        <h1 style={{margin: '10px auto'}}>ExcelSense</h1>
        <Route path="/" exact component={Assets} />
        <Route path="/entities" exact component={Entities} />
    </Router>
  );
}

export default App;
