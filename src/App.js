import { Component } from "react";
import Web3 from 'web3';
import React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Purchase from "./components/Purchase";
import Home from "./components/Home";
import Loan from "./components/Loan";
import Dashboard from "./components/Dashboard";
import EventDashboard from "./components/EventDashboard";
class App extends Component {
  
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route index element={<Home />} /> */}
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/event-dashboard" element={<EventDashboard />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
