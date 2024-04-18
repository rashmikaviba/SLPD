import { BrowserRouter, Routes, Route } from 'react-router-dom'

import React from 'react'
import Home from '../src/pages/Home'
import AddDetails from '../src/pages/AddDetails'
import Notifications from '../src/pages/Notifications'
import Projects from '../src/pages/Projects'
import Dashboard from '../src/pages/Dashboard'
import Header from '../src/components/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header />

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adddetails" element={<AddDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />

      </Routes>
    
    </BrowserRouter>
      
  )
}
