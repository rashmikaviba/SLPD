

import React, { useState } from 'react';
import axios from 'axios';

export default function TripView() {
  const [username, setUsername] = useState('');
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/user/trip/${username}`);
      setTrip(response.data);
    } catch (error) {
      setError('Trip not found');
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">View Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Enter Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Get Trip
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {trip && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Trip Details</h3>
          <p>Username: {trip.userName}</p>
          <p>Name: {trip.name}</p>
          <p>Email: {trip.email}</p>
          <p>Start Date: {trip.startDate}</p>
          <p>End Date: {trip.endDate}</p>
          <p>Number of Days: {trip.noOfDays}</p>
          <p>Location: {trip.location}</p>
          <p>Vehicle Type: {trip.vehicleType}</p>
        </div>
      )}
    </div>
  );
}
