import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

export default function TripUpdate() {
  const [formData, setFormData] = useState({
    userName: '',
    startDate: '',
    endDate: '',
    noOfDays: '',
    location: '',
    vehicleType: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [updateFormData, setUpdateFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/user/trip/${formData.userName}`, formData);
      setSuccess(true);
    } catch (error) {
      setError('Failed to update trip. Please try again.');
    }
  };

  const handleUserNameChange = (e) => {
    setFormData({ ...formData, userName: e.target.value });
  };

  useEffect(() => {
    if (updateFormData) {
      setFormData(updateFormData);
    }
  }, [updateFormData]);

  // Function to fetch trip data by username
  const fetchTripData = async (userName) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/trip/${userName}`);
      setUpdateFormData(response.data);
    } catch (error) {
      console.error('Error fetching trip data:', error);
    }
  };

  // Call fetchTripData when component mounts
  useEffect(() => {
    // Fetch data of the last created trip
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/trip');
        const lastTrip = response.data[response.data.length - 1];
        if (lastTrip) {
          fetchTripData(lastTrip.userName);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {success ? (
        <SuccessMessage />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-bold mb-4">Update Trip</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Username:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleUserNameChange}
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
            <button onClick={handleUpdate} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
