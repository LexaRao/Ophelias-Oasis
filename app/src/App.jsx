import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar';

import Home from "./Home";
import Reservation from './Reservation';
import SignUp from './SignUp';
import LogIn from './LogIn';

import './App.css'

function App() {


  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/logIn" element={<LogIn />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
