import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Header from "./Components/Header"
import Home from "./Components/Home"
import Exchanges from "./Components/Exchanges"
import Details from "./Components/Details"
import Coins from "./Components/Coins";


function App() {
  return (
    <Router>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Coins" element={<Coins/>} />
        <Route path="/Exchanges" element={<Exchanges/>} />
        <Route path="/Coins/:id" element={<Details/>} />
      </Routes>
    </Router>
  );
}

export default App;
