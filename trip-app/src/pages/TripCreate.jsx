import React, { useState } from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

export default function TripCreate() {
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    noOfDays: '',
    location: '',
    vehicleType: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://localhost:3000/api/user/signup', formData);
      setSuccess(true);
    } catch (error) {
      setError('Failed to create trip. Please try again.');
    }
  };

  return (
    <div>
      {success ? (
        <SuccessMessage />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-bold mb-4">Create a Trip</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">Number of Days:</label>
              <input
                type="number"
                name="noOfDays"
                value={formData.noOfDays}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label className="block mb-1">Vehicle Type:</label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
