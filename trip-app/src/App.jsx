import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import TripCreate from './pages/TripCreate';
import TripUpdate from './pages/TripUpdate';
import TripDelete from './pages/TripDelete';
import TripView from './pages/TripView';
import Header from './components/Header';
import AboutUs from './pages/AboutUs';


export default function App() {
  return (
    <BrowserRouter>

    <Header/>
              <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="tripcreate" element={<TripCreate />} />
                    <Route path="/tripupdate" element={<TripUpdate />} />
                    <Route path="/tripview" element={<TripView />}  />
                    <Route path="/tripdelete" element={<TripDelete />} />
                    <Route path="aboutus" element={<AboutUs/>} />
              </Routes>
    </BrowserRouter>
  )
}
