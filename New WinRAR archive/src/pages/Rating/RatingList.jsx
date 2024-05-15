import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { TbReport, TbTextColor } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import * as XLSX from "xlsx";
import { TiEdit } from "react-icons/ti";
import { MdDeleteSweep } from "react-icons/md";
import { CustomToastService } from "../../shared/message.service";
import { MdCancelScheduleSend } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineRecommend } from "react-icons/md";


const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRating, setEditRating] = useState(null); 
  const [showEditDialog, setShowEditDialog] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ratings/');
        setRatings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRatings = ratings.filter(rating => {
    return rating.driverName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (ratingId) => {
    try {
      // Fetch the MongoDB _id associated with the ratingId from your ratings array
      const ratingToDelete = ratings.find(rating => rating.ratingId === ratingId);
      if (!ratingToDelete) {
        console.error('Rating not found');
        return;
      }
  
      // Ask for confirmation before deleting
      const confirmed = window.confirm('Are you sure you want to delete this rating?');
      if (!confirmed) {
        return;
      }
  
      // Pass the MongoDB _id to the delete endpoint
      await axios.delete(`http://localhost:3000/api/ratings/delete/${ratingToDelete._id}`);
  
      // Update the ratings state by filtering out the deleted rating
      setRatings(ratings.filter(rating => rating.ratingId !== ratingId));
  
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEdit = (rating) => {
    setEditRating(rating); // Set the rating to be edited
    setShowEditDialog(true); // Show the edit dialog
  };

  const handleSaveEdit = async (updatedRating) => {
    try {
      // Make PUT request to update the rating
      await axios.put(`http://localhost:3000/api/ratings/edit/${updatedRating._id}`, updatedRating);
      
      // Update the ratings state to reflect the changes
      setRatings(ratings.map(rating => rating.ratingId === updatedRating.ratingId ? updatedRating : rating));

      setShowEditDialog(false); // Hide the edit dialog
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false); // Hide the edit dialog
  };

  const styles = {
    tableHeader: {
      background: '#f0f0f0',
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    tableRow: {
      border: '1px solid #ddd',
      padding: '8px',
    },
    tableData: {
      border: '1px solid #ddd',
      padding: '8px',
      color: 'white',
    },
  };


  const downloadXLS = () => {
    const worksheet = XLSX.utils.json_to_sheet(ratings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ratings");
    const xlsBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    const blob = new Blob([xlsBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ratings.xlsx");
    document.body.appendChild(link);
    link.click();
  };


  return (
    <div className="ShowBookList">
      <div className="container mx-auto">
        <br/><br/>
        <h6 className="display-6 text-center text-green-600 font-bold">
          Rating Management - Ratings List
        </h6><br/><br/>
        <div className="col-md-12">
          <div className="flex justify-between mb-2 mt-4">
            <div>
              <Link to="/add-rating">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <div className="flex gap-2 align-middle">
                    <FaPlus size={"20px"} />
                    Add Rating
                  </div>
                </button>
              </Link>
            </div>

            <div className="flex gap-2">
              <div>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <CiSearch color="gray" size={"20px"} />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Name..."
                    onChange={handleSearch}
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={downloadXLS}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <div className="flex gap-2 align-middle">
                  <TbReport size={"20px"} />
                  Generate Report
                </div>
                
              </button>
              <button
                type="button"
                
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <div className="flex gap-2 align-middle">
                  <MdOutlineRecommend size={"20px"} />
                  Recommend
                </div>
              </button>
            </div>
          </div><br/><br/>

          <hr />
        </div>
      
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Rating ID</th>
              <th style={styles.tableHeader}>Rating</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Driver ID</th>
              <th style={styles.tableHeader}>Driver Name</th>
              <th style={styles.tableHeader}>Trip ID</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.map((rating, index) => (
              <tr key={`${rating.ratingId}-${index}`} style={styles.tableRow}>
                <td style={styles.tableData}>{rating.ratingId}</td>
                <td style={styles.tableData}>{rating.rating}</td>
                <td style={styles.tableData}>{rating.description}</td>
                <td style={styles.tableData}>{rating.driverId}</td>
                <td style={styles.tableData}>{rating.driverName}</td>
                <td style={styles.tableData}>{rating.tripId}</td>
                <td style={styles.tableData}>
                  <button
                    onClick={() => handleDelete(rating.ratingId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <MdDeleteSweep size={"20px"} />
                  </button>
                  <span style={{ marginRight: '25px' }}></span>
                  <button onClick={() => handleEdit(rating)}>
                    <TiEdit size={"25px"} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showEditDialog && editRating && (
          <EditDialog
            rating={editRating}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}

      </div>
    </div>
  );
};

const EditDialog = ({ rating, onSave, onCancel }) => {
  const [updatedRating, setUpdatedRating] = useState({ ...rating });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRating(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedRating);
  };

  const styles = {
    tableHeader: {
      background: '#f0f0f0',
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    tableRow: {
      border: '1px solid #ddd',
      padding: '8px',
    },
    tableData: {
      border: '1px solid #ddd',
      padding: '8px',
      color: 'white',
    },
  };

  return (
    <>
    <br/><br/><br/><br/>
    <div className="edit-dialog">
      <form onSubmit={handleSubmit}>
        <label style={styles.tableData}>Rating:</label>
        <input style={styles.tableHeader} type="text" name="rating" value={updatedRating.rating} onChange={handleChange} />
        <label style={styles.tableData}>Description:</label>
        <input  style={styles.tableHeader} type="text" name="description" value={updatedRating.description} onChange={handleChange} />
        {/* Add more fields for other rating properties */}
        <button type="submit" className="flex items-center justify-center gap-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
  <FaSave size={20} />
  Save
</button>
<button type="button" onClick={onCancel} className="flex items-center justify-center gap-1 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
  <MdCancelScheduleSend size={20} />
  Cancel
</button>

      </form>
    </div>
    </>
  );
};

export default RatingList;
