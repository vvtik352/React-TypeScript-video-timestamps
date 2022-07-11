import React, { useEffect, useState } from 'react';
import './App.css';
import { TimeStampAnalytic } from './types/types';
import TimeStampVideo from './components/TimeStampVideo';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimeStampVideo />
      </header>
    </div>
  );
}

export default App;
