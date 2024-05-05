import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import TripCreate from './pages/TripCreate';
import TripUpdate from './pages/TripUpdate';
import TripDelete from './pages/TripDelete';
import TripView from './pages/TripView';
import AboutUs from './pages/AboutUs';
import AvailableTrips from './pages/AvailableTrips';

export default function App() {
  const [trips, setTrips] = useState([]);

  const updateTrips = (newTrips) => {
    setTrips(newTrips);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tripcreate" element={<TripCreate />} />
        <Route path="/tripupdate" element={<TripUpdate />} />
        <Route path="/tripview" element={<TripView updateTrips={updateTrips} />} />
        <Route path="/tripdelete" element={<TripDelete />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="availabletrips" element={<AvailableTrips trips={trips} />} />
      </Routes>
    </BrowserRouter>
  );
}
