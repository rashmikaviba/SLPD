import React, { useState } from 'react';
import axios from 'axios';
import { CustomToastService } from "../../shared/message.service";

const AddRatingForm = () => {
  const [ratingData, setRatingData] = useState({
    ratingId: '',
    rating: '',
    description: '',
    driverId: '',
    driverName: '',
    tripId: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingData({ ...ratingData, [name]: value });
  };

  const handleRatingChange = (value) => {
    setRatingData({ ...ratingData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/ratings/add', ratingData);
      console.log(response.data);
      setSuccessMessage('Rating added successfully!');
      CustomToastService.success('Rating added successfully!');
      setRatingData({
        ratingId: '',
        rating: '',
        description: '',
        driverId: '',
        driverName: '',
        tripId: ''
      });
      window.location.href = "/rating-list";
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to add rating. Please try again later.');
      CustomToastService.error(error.response.data.message);
    }
  };

  return (
    <div className="ShowBookList">
      <div className="container mx-auto">
        <br/><br/>
        <h6 className="display-6 text-center text-green-600 font-bold">
          Rating Management - Add Ratings
        </h6>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <br/><br/>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="ratingId">Rating ID:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="ratingId" name="ratingId" value={ratingData.ratingId} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="rating">Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 ${ratingData.rating === value ? 'bg-green-600' : ''}`}
                  type="button"
                  onClick={() => handleRatingChange(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="description">Description:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="description" name="description" value={ratingData.description} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="driverId">Driver ID:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="driverId" name="driverId" value={ratingData.driverId} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="driverName">Driver Name:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="driverName" name="driverName" value={ratingData.driverName} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="tripId">Trip ID:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="tripId" name="tripId" value={ratingData.tripId} onChange={handleChange} />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="submit">Add Rating</button>
        </form>
      </div>
    </div>
  );
};

export default AddRatingForm;
