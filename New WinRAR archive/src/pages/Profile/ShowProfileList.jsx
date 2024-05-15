import { useState, useEffect } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { FaPlus } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import * as XLSX from "xlsx";
import { CustomToastService } from "../../shared/message.service";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function ShowProfileList() {
  const [profile, setProfile] = useState([]);
  const [tempProfile, setTempProfile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  // Get all users
  const getAllUsers = async () => {
    try {
      await axios.get("/user/getAll").then((response) => {
        if (response.data.isSuccess) {
          setProfile(response.data.users);
          setTempProfile(response.data.users);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Search profile
  const searchProfile = (e) => {
    const keyword = e.target.value;
    const results = tempProfile.filter((profile) => {
      return profile.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setProfile(results);
  };

  // Generate report
  const generateReport = () => {
    let data = [];
    profile.forEach((profile) => {
      data.push([
        profile.name,
        profile.email,
        profile.age,
        profile.role,
        profile.status,
        profile.gender,
      ]);
    });

    // Convert data array to worksheet format
    const ws = XLSX.utils.aoa_to_sheet([
      ["Name", "Email", "Age", "Role", "Status", "Gender"],
      ...data,
    ]);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the file
    XLSX.writeFile(wb, `Profile Report ${new Date().toDateString()}.xlsx`);
  };

  // Delete profile
  const deleteProfile = async (id) => {
    try {
      await axios.delete(`/user/${id}`).then((response) => {
        if (response.data.isSuccess) {
          CustomToastService.success(response.data.message);
          getAllUsers();
        }
      });
    } catch (error) {
      if (error.response.data.message) {
        CustomToastService.error(error.response.data.message);
      }
    }
  };

  // Approve profile
  const approveProfile = async (id) => {
    try {
      await axios.put(`/user/approve/${id}`).then((response) => {
        if (response.data.isSuccess) {
          CustomToastService.success(response.data.message);
          getAllUsers();
        }
      });
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const editProfile = async (id) => {
    navigate(`/update-details/${id}`);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(profile.length / itemsPerPage);

  // Pagination logic for changing pages
  const handleClick = (page) => {
    if (page + 1 === 1) {
      return;
    }

    if (page - 1 === totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  // Generate pagination links
  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <li key={i}>
          <a
            href="#"
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
              currentPage === i
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleClick(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pagination;
  };

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profile.slice(indexOfFirstItem, indexOfLastItem);

  const profileList =
    profile.length === 0
      ? "there is no Profile record!"
      : currentItems.map((profile, k) => (
          <ProfileCard
            profile={profile}
            key={k}
            onDelete={() => deleteProfile(profile._id)}
            onApprove={() => approveProfile(profile._id)}
            onEdit={() => editProfile(profile._id)}
          />
        ));

  return (
    <>
      <div className="ShowBookList">
        <div className="container">
          <div className="row mb-10">
            <div className="col-md-12 mt-3">
              <h6 className="display-6 text-center text-green-600 font-bold">
                Driver Management
              </h6>
            </div>

            <div className="col-md-12">
              <div className="flex justify-between mb-2 mt-4">
                <div>
                  <Link to="/create-Profile">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <div className="flex gap-2 align-middle">
                        <FaPlus size={"20px"} />
                        Add Driver
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
                        onChange={(e) => searchProfile(e)}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => generateReport()}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <div className="flex gap-2 align-middle">
                      <TbReport size={"20px"} />
                      Generate Report
                    </div>
                  </button>
                </div>
              </div>

              <hr />
            </div>
          </div>

          <div className="list">{profileList}</div>

          {
            profile.length > 0 ? (<div className="flex justify-center gap-4 mt-5">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                {/* Previous button */}
                <li>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${
                      currentPage === 1
                        ? "cursor-not-allowed"
                        : "hover:bg-gray-100 hover:text-gray-700"
                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <MdKeyboardArrowLeft />
                  </a>
                </li>
                {renderPagination()}
                <li>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
                      currentPage === totalPages
                        ? "cursor-not-allowed"
                        : "hover:bg-gray-100 hover:text-gray-700"
                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <MdKeyboardArrowRight />
                  </a>
                </li>
              </ul>
            </nav>
          </div>): ""
          }
        </div>
      </div>
    </>
  );
}

export default ShowProfileList;
