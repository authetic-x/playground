import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './App.less';

const api = require('./mock/api.json')

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(api.data)
  }, []);

  return (
    <div className="App">
      <div className="header">
        <span>Miss xx</span>
      </div>

      <div className="content">
        {list.map((item: any) => (
          <div className="list-item">
            <span className="time">{item.time}</span>
            <span className="text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
