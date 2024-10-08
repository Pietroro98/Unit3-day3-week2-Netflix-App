// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";
import "./Footer.css";
import React from "react";
import MyNavbar from "../src/components/MyNavbar";
import MyFooter from "../src/components/MyFooter";
import Homepage from "../src/components/Homepage";
import Gallery from "../src/components/Gallery";
import Profile from "../src/components/Profile"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TVShows from '../src/components/TvShows';
import MovieDetails from '../src/components/MovieDetails';


const App = () => {
  return (
   <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        <Route path="/account" element={<Profile />} />
      </Routes>
      <MyFooter />
    </Router>
  );
}

export default App;
