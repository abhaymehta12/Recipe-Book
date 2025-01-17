import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Dashboard from '../views/Dashboard';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/Recipe-Book/home" element={<Home />} />
          <Route path="/Recipe-Book/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigation;