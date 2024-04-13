import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import TripCreate from './pages/TripCreate';
import TripUpdate from './pages/TripUpdate';
import TripDelete from './pages/TripDelete';
import TripView from './pages/TripView';

export default function App() {
  return (
    <BrowserRouter>
              <Routes>
                    <Route path="/tripcreate" element={<TripCreate />} />
                    <Route path="/tripupdate" element={<TripUpdate />} />
                    <Route path="/tripview" element={<TripView />}  />
                    <Route path="/tripdelete" element={<TripDelete />} />
              </Routes>
    </BrowserRouter>
  )
}
