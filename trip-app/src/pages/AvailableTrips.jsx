import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AvailableTrips.css';
import Map from './Map';

// const TripDetails = ({ trip }) => {
//   return (
//     <div>
//       <h3>Trip Details</h3>
//       <p>Location: {trip.location}</p>
//       <Map location={trip.location} />
//     </div>
//   );
// };

// const trip = {
//   location: {
//     name: 'Trip location',
//     lat: 51.505,
//     lng: -0.09
//   }
// };

export default function AvailableTrips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/trips'); // Updated API endpoint
        setTrips(response.data);
      } catch (error) {
        setError('Failed to fetch trips');
      }
    };
    fetchTrips();
  }, []);

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/user/trip/complete/${id}`);
      setTrips((prevTrips) => prevTrips.map((trip) => (trip._id === id ? { ...trip, isCompleted: true } : trip)));
    } catch (error) {
      setError('Failed to mark trip as completed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/trip/${id}`);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
    } catch (error) {
      setError('Failed to delete trip');
    }
  };

  // Filter trips based on search query
  const filteredTrips = trips.filter((trip) =>
    trip.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="background-image">
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Trips</h2>
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div>
          {filteredTrips.length === 0 && <p>No trips available</p>}
          {filteredTrips.map((trip) => (
            <div key={trip._id} className="mt-8 border rounded-md p-4 trip-container">
              <h3 className="text-lg font-bold mb-4">Trip Details</h3>
              <p>Username: {trip.userName}</p>
              <p>Name: {trip.name}</p>
              <p>Email: {trip.email}</p>
              <p>Start Date: {trip.startDate}</p>
              <p>End Date: {trip.endDate}</p>
              <p>Number of Days: {trip.noOfDays}</p>
              <p>Location: {trip.location}</p>
              <p>Vehicle Type: {trip.vehicleType}</p>
              <p>Estimated Budget: {trip.estBudget}</p>
              {trip.isCompleted ? (
                <p>Status: Completed</p>
              ) : (
                <button
                  onClick={() => handleComplete(trip._id)}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 complete-button"
                >
                  Mark as Complete
                </button>
              )}
              {/* {!trip.isCompleted && (
                <button
                  onClick={() => handleDelete(trip.tripId)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4 ml-4 delete-button"
                >
                  Delete Trip
                </button>
              )} */}
            </div>
          ))}
        </div>
        <Link to="/tripview">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 view-button">
            Go to Trip View
          </button>
        </Link>
      </div>
    </div>
  );
}
