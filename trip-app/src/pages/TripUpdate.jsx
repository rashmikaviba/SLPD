import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

const sriLankanLocations = ["Colombo", "Kandy", "Galle", "Nuwara Eliya", "Sigiriya", "Anuradhapura", "DownSouth", "Jaffna", "Trincomalee", "Ella"];
const locationBudget = {
  Colombo: 30000,
  Kandy: 80000,
  Galle: 120000,
  "Nuwara Eliya": 200000,
  Sigiriya: 150000,
  Anuradhapura: 220000,
  DownSouth: 300000,
  Jaffna: 320000,
  Trincomalee: 280000,
  Ella: 350000
};
const vehicleTypes = ["Car", "Van", "Mini-Van", "Bus", "Luxury"];
const vehicleBudget = {
  Car: 5000,
  Van: 8000,
  "Mini-Van": 6000,
  Bus: 10000,
  Luxury: 15000
};

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
  const [searchKey, setSearchKey] = useState('');
  const [searchType, setSearchType] = useState('username');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let estBudget = '';

    if (name === "location") {
      estBudget = locationBudget[value] || '';
    }

    if (name === "vehicleType") {
      estBudget = vehicleBudget[value] || '';
    }

    setFormData({ ...formData, [name]: value, estBudget: estBudget });
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/trip/${searchType}/${searchKey}`);
      setFormData(response.data);
      setSuccess(false);
      setError('');
    } catch (error) {
      setError('Trip not found.');
      setSuccess(false);
    }
  };

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      // Frontend validation
      const newFormErrors = {
        startDate: formData.startDate ? '' : 'Start Date is required',
        endDate: formData.endDate ? '' : 'End Date is required',
        noOfDays: formData.noOfDays ? '' : 'Number of Days is required',
        location: formData.location ? '' : 'Location is required',
        vehicleType: formData.vehicleType ? '' : 'Vehicle Type is required'
      };

      // Check if end date is before start date
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newFormErrors.endDate = 'End date cannot be before start date';
      }

      // Check if location is within Sri Lanka
      if (!sriLankanLocations.includes(formData.location)) {
        newFormErrors.location = 'Invalid location. Please select a location within Sri Lanka';
      }

      // Check if there are any errors
      const hasError = Object.values(newFormErrors).some(error => error !== '');

      if (hasError) {
        setError('Please fix the validation errors.');
        return;
      }

      // Update trip
      await axios.put(`http://localhost:3000/api/user/trip/${formData.userName}`, formData);
      setSuccess(true);
      setError('');
    } catch (error) {
      setError('Failed to update trip. Please try again.');
      setSuccess(false);
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
          <h2 className="text-2xl font-bold mb-4">Update Trip</h2>
          <div className="flex mb-4">
            <div className="mr-4">
              <label className="block mb-1">Search By:</label>
              <select
                className="w-full border rounded py-2 px-3"
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                <option value="username">Username</option>
                <option value="tripid">Trip ID</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">{searchType === 'username' ? 'Username:' : 'Trip ID:'}</label>
              <input
                type="text"
                value={searchKey}
                onChange={handleSearchKeyChange}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <button onClick={handleFetch} className="bg-blue-500 text-white font-bold py-2 px-3 mt-7 ml-4 rounded" style={{ width: '120px', height: '40px' }}>
              Fetch
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formData.startDate ? '' : 'border-red-500'
                }`}
              />
              {formData.startDate === '' && <p className="text-red-500 text-sm mt-1">Start Date is required</p>}
            </div>
            <div>
              <label className="block mb-1">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formData.endDate ? '' : 'border-red-500'
                }`}
              />
              {formData.endDate === '' && <p className="text-red-500 text-sm mt-1">End Date is required</p>}
            </div>
            <div>
              <label className="block mb-1">Number of Days:</label>
              <input
                type="number"
                name="noOfDays"
                value={formData.noOfDays}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formData.noOfDays ? '' : 'border-red-500'
                }`}
              />
              {formData.noOfDays === '' && <p className="text-red-500 text-sm mt-1">Number of Days is required</p>}
            </div>
            <div>
              <label className="block mb-1">Location:</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formData.location ? '' : 'border-red-500'
                }`}
              >
                <option value="">Select a location</option>
                {sriLankanLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {formData.location === '' && <p className="text-red-500 text-sm mt-1">Location is required</p>}
            </div>
            <div>
              <label className="block mb-1">Vehicle Type:</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formData.vehicleType ? '' : 'border-red-500'
                }`}
              >
                <option value="">Select a vehicle</option>
                {vehicleTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formData.vehicleType === '' && <p className="text-red-500 text-sm mt-1">Vehicle Type is required</p>}
            </div>
            <div>
              <label className="block mb-1">Estimated Budget (LKR):</label>
              <input
                type="text"
                name="estBudget"
                value={formData.estBudget}
                readOnly
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
