// TripDelete.jsx

import React, { useState } from 'react';
import axios from 'axios';

export default function TripDelete() {
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/api/user/trip/${username}`);
      setSuccess(true);
    } catch (error) {
      setError('Trip not found');
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Delete Trip</h2>
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
        <button type="submit" className="bg-red-500 text-white font-bold py-2 px-4 rounded">
          Delete Trip
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {success && <p className="text-green-500 mt-4">Trip deleted successfully</p>}
    </div>
  );
}
