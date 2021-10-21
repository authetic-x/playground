import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes/config';
import './App.less';

const api = require('./mock/api.json');

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(api.data);
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
