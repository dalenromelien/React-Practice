import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Navbar } from './features/Navbar/Navbar';
import './App.css';
import { MultipleEmployees } from './features/MultipleEmployees/MultipleEmployees';
import { SingleEmployee } from './features/SingleEmployee/SingleEmployee';

function App() {
  return (
    <div className="App">
      <Router> 
        <Navbar />
        <Routes>
          <Route path='/' element={<MultipleEmployees />}/>
          <Route path='/employee/:employeeId' element={<SingleEmployee />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
