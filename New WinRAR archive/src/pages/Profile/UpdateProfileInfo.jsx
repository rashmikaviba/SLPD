import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomToastService } from "../../shared/message.service";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

function UpdateProfileInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // get id from the URL
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, [id]);

  const getUserById = async () => {
    try {
      await axios.get(`/user/getById/${id}`).then((response) => {
        if (response.data.isSuccess) {
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setAge(response.data.user.age);
          setGender(response.data.user.gender);
        }
      });
    } catch (error) {
      if (error.response.data.message) {
        CustomToastService.error(error.response.data.message);
      }
    }
  };

  const onUpdateDriver = async (e) => {
    e.preventDefault();
    const data = { name, age, gender };

    try {
      setLoading(true);

      const validationErrors = validate(data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      } else {
        setErrors({});
      }

      await axios.put(`/user/update/${id}`, data).then((response) => {
        if (response.data.isSuccess) {
          CustomToastService.success(response.data.message);
          navigate("/profile-list");
          setLoading(false);
        } else {
          CustomToastService.error(response.data.message);
          setLoading(false);
        }
      });
    } catch (error) {
      if (error.response.data.message) {
        CustomToastService.error(error.response.data.message);
      }
      setLoading(false);
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = "Name is required";
    }
    if (!data.age || data.age === "") {
      errors.age = "Age is required";
    } else if (isNaN(data.age)) {
      errors.age = "Invalid Age";
    } else if (data.age < 18) {
      errors.age = "Minimum age is 18";
    } else if (data.age > 60) {
      errors.age = "Maximum age is 60";
    }
    if (!data.gender || data.gender === "0") {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  return (
    <>
      <div className="ShowBookList">
        <div className="container">
          <div className="row mb-10">
            <div className="col-md-12 mt-3">
              <h6 className="display-6 text-center text-green-600 font-bold">
                Edit Driver
              </h6>
            </div>

            <div className="col-md-12">
              <div className="flex justify-between mb-2 mt-4">
                <div>
                  <Link to="/profile-list">
                    <button
                      type="button"
                      className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                      <div className="flex gap-2 align-middle">
                        <FaArrowLeft size={"20px"} />
                        Back To Profile List
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

              <hr />
            </div>

            <div className="col-md-6 m-auto">
              <form>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    value={email}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Age
                    </label>
                    <input
                      type="text"
                      id="age"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Age"
                      onChange={(e) => setAge(e.target.value)}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                      value={age}
                    />
                    {errors.age && (
                      <span className="text-red-500 text-sm">{errors.age}</span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Gender
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <option value="0">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    {errors.gender && (
                      <span className="text-red-500 text-sm">
                        {errors.gender}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onUpdateDriver}
                  >
                    <span className="flex justify-center gap-2 align-middle">
                      <FaSave size={"18px"} />
                      Submit
                    </span>
                  </button>

                  <button
                    type="button"
                    className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                    onClick={() => {
                      getUserById();
                    }}
                  >
                    <span className="flex justify-center gap-2 align-middle">
                      <FaArrowRotateLeft size={"18px"} />
                      Reset
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfileInfo;
