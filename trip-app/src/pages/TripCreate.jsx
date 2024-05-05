import React, { useState } from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

const sriLankanLocations = ["Colombo", "Kandy", "Galle", "Nuwara Eliya", "Sigiriya", "Anuradhapura", "DownSouth", "Jaffna", "Trincomalee", "Ella"];
const locationBudget = {
  Colombo: 30000,
  Kandy : 80000,
  Galle : 120000,
  "Nuwara Eliya" : 200000,
  Sigiriya : 150000,
  Anuradhapura : 220000,
  DownSouth : 300000,
  Jaffna : 320000,
  Trincomalee : 280000,
  Ella : 350000
};
const vehicleTypes = ["Car", "Van", "Mini-Van", "Bus", "Luxury"];
const vehicleBudget = {
  Car: 5000,
  Van: 8000,
  "Mini-Van": 6000,
  Bus: 10000,
  Luxury: 15000
};

export default function TripCreate() {
  const [formData, setFormData] = useState({
    tripId: '',
    userName: '',
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    noOfDays: '',
    location: '',
    vehicleType: '',
    estBudget: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    userName: '',
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    noOfDays: '',
    location: '',
    vehicleType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is startDate
    if (name === "startDate") {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      // Check if the selected date is before the current date
      if (selectedDate < currentDate) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Start Date cannot be a past date",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    // Check if the input field is endDate
    if (name === "endDate") {
      const selectedEndDate = new Date(value);
      const selectedStartDate = new Date(formData.startDate);

      // Check if the selected date is before the start date
      if (selectedEndDate <= selectedStartDate) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "End Date must be after the Start Date",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Check if the input field is location
    if (name === "location") {
      if (!sriLankanLocations.includes(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid location. Please select a location within Sri Lanka",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Check if the input field is noOfDays
    if (name === "noOfDays") {
      if (parseInt(value) < 0) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Number of Days cannot be negative",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    setFormData({ ...formData, [name]: value });

    // Update estBudget based on vehicleType and location
    if (name === "vehicleType" || name === "location") {
      const locationAmount = locationBudget[formData.location] || 0;
      const vehicleAmount = vehicleBudget[formData.vehicleType] || 0;
      const totalBudget = locationAmount + vehicleAmount;
      setFormData({
        ...formData,
        [name]: value,
        estBudget: totalBudget
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Frontend validation
    const newFormErrors = {
      userName: formData.userName ? '' : 'Username is required',
      name: formData.name ? '' : 'Name is required',
      email: formData.email ? '' : 'Email is required',
      startDate: formData.startDate ? '' : 'Start Date is required',
      endDate: formData.endDate ? '' : 'End Date is required',
      noOfDays: formData.noOfDays ? '' : 'Number of Days is required',
      location: formData.location ? '' : 'Location is required',
      vehicleType: formData.vehicleType ? '' : 'Vehicle Type is required',
      estBudget: formData.estBudget ? '' : 'Est Budget is required'
    };

    // Check if end date is before start date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newFormErrors.endDate = 'End date cannot be before start date';
    }

    setFormErrors(newFormErrors);

    // Check if there are any errors
    Object.values(newFormErrors).forEach((error) => {
      if (error) {
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    console.log(formData);

    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        userName: formData.userName,
        name: formData.name,
        email: formData.email,
        startDate: formData.startDate,
        endDate: formData.endDate,
        noOfDays: formData.noOfDays,
        location: formData.location,
        vehicleType: formData.vehicleType,
        estBudget: formData.estBudget
      });
      setFormData({ ...formData, tripId: response.data.tripId });
      setSuccess(true);
    } catch (error) {
      setError('Failed to create trip. Please try again.');
    }
  };

  const copyTripIdToClipboard = () => {
    const tripIdInput = document.getElementById('tripId');
    tripIdInput.select();
    document.execCommand('copy');
  };

  return (
    <div>
      {success ? (
        <SuccessMessage tripId={formData.tripId} />
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
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.userName ? 'border-red-500' : ''
                }`}
              />
              {formErrors.userName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.userName}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.name ? 'border-red-500' : ''
                }`}
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.email ? 'border-red-500' : ''
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.startDate ? 'border-red-500' : ''
                }`}
              />
              {formErrors.startDate && (
                <p className="text-red-500 text-sm mt-1">{formErrors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.endDate ? 'border-red-500' : ''
                }`}
              />
              {formErrors.endDate && (
                <p className="text-red-500 text-sm mt-1">{formErrors.endDate}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Number of Days:</label>
              <input
                type="number"
                name="noOfDays"
                value={formData.noOfDays}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.noOfDays ? 'border-red-500' : ''
                }`}
              />
              {formErrors.noOfDays && (
                <p className="text-red-500 text-sm mt-1">{formErrors.noOfDays}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Location:</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.location ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select a location</option>
                {sriLankanLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {formErrors.location && (
                <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Vehicle Type:</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 ${
                  formErrors.vehicleType ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select a vehicle</option>
                {vehicleTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formErrors.vehicleType && (
                <p className="text-red-500 text-sm mt-1">{formErrors.vehicleType}</p>
              )}
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
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            {formData.tripId && (
              <div className="mt-4">
                <label className="block mb-1">Trip ID:</label>
                <div className="flex">
                  <input
                    type="text"
                    id="tripId"
                    value={formData.tripId}
                    readOnly
                    className="w-full border rounded py-2 px-3 mr-2"
                  />
                  <button
                    type="button"
                    onClick={copyTripIdToClipboard}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
