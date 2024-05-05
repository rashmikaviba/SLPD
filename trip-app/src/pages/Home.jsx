import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trip Management System</h1>
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li><Link to="tripcreate" className="text-blue-500 hover:text-blue-700">Create Trip</Link></li>
          <li><Link to="/tripupdate" className="text-blue-500 hover:text-blue-700">Update Trip</Link></li>
          <li><Link to="/tripview" className="text-blue-500 hover:text-blue-700">View Trip</Link></li>
          <li><Link to="/tripdelete" className="text-blue-500 hover:text-blue-700">Delete Trip</Link></li>
        </ul>
      </nav>
      <p>Welcome to Trip Management System. Click the links above to manage your trips.</p>
    </div>
  );
}
