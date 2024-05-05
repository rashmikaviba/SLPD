import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function TripView({ updateTrips }) {
  const [searchKey, setSearchKey] = useState('username');
  const [searchValue, setSearchValue] = useState('');
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/user/trip/${searchKey}/${searchValue}`);
      setTrip(response.data);
      updateTrips([response.data]);
      setError('');
    } catch (error) {
      setError('Trip not found');
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tripDetails = [
      `Username: ${trip.userName}`,
      `Name: ${trip.name}`,
      `Email: ${trip.email}`,
      `Start Date: ${trip.startDate}`,
      `End Date: ${trip.endDate}`,
      `Number of Days: ${trip.noOfDays}`,
      `Location: ${trip.location}`,
      `Vehicle Type: ${trip.vehicleType}`
    ];
    doc.text(tripDetails, 10, 10);
    doc.save('trip_details.pdf');
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">View Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Search By:</label>
          <select
            value={searchKey}
            onChange={handleKeyChange}
            className="w-full border rounded py-2 px-3"
          >
            <option value="username">Username</option>
            <option value="tripid">Trip ID</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Enter {searchKey === 'username' ? 'Username' : 'Trip ID'}:</label>
          <input
            type="text"
            value={searchValue}
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
        <div className="mt-8 border rounded-md p-4">
          <h3 className="text-lg font-bold mb-4">Trip Details</h3>
          <p>Username: {trip.userName}</p>
          <p>Name: {trip.name}</p>
          <p>Email: {trip.email}</p>
          <p>Start Date: {trip.startDate}</p>
          <p>End Date: {trip.endDate}</p>
          <p>Number of Days: {trip.noOfDays}</p>
          <p>Location: {trip.location}</p>
          <p>Vehicle Type: {trip.vehicleType}</p>
          <p>Estimated Budget: LKR {trip.estBudget}</p>
          <button onClick={downloadPDF} className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4">
            Download PDF
          </button>
          <Link to={{ pathname: '/tripupdate', state: { trip } }}>
            <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
              Update Trip
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
