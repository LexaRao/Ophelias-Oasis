import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar';

import Home from "./Home";
import Reservation from './Reservation';

import './App.css'

function App() {


  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<Reservation />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
