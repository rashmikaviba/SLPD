import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function ShowProfileDetails() {
  const [profile, setprofile] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/profile/${id}`)
      .then((res) => {
        setprofile(res.data);
      })
      .catch(() => {
        console.log("Error from profile");
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3000/api/profile/${id}`)
      .then(() => {
        navigate("/profile-list");
      })
      .catch(() => {
        console.log("Error form profile");
      });
  };

  const ProfileItem = (
    <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{profile.title}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Name</td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Age</td>
            <td>{profile.age}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Gender</td>
            <td>{profile.gender}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show profile List
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">profile&apos;s Record</h1>
            <p className="lead text-center">View profile&apos;s Info</p>
            <hr /> <br />
          </div>
          <div className="col-md-10 m-auto">{ProfileItem}</div>
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={() => {
                onDeleteClick(profile._id);
              }}
            >
              Delete profile
            </button>
          </div>
          <div className="col-md-6 m-auto">
            <Link
              to={`/update-details/${profile._id}`}
              className="btn btn-outline-info btn-lg btn-block"
            >
              Edit profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProfileDetails;
