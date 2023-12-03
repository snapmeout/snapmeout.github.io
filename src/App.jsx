import React, { useState} from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './styles.css'

import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from './components/Home';
import AddFocus from './components/AddFocus';
import AddDistractions from './components/AddDistractions';
import SnapMeOutApp from './components/SnapMeOutApp';

function App() {
  const [focus, setFocus] = useState();
  const [distractions, setDistractions] = useState([]);

  console.log('Parent component rerender')
  return (
    <div className="app">
        <div>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/focus" element={<AddFocus setFocus={setFocus}/>} />
        <Route path="/distractions" element={<AddDistractions setDistractions={setDistractions}/>} />
        <Route path="/snapmeoutapp" element={<SnapMeOutApp focus={focus} distractions={distractions.slice()}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
