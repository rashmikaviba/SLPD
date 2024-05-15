import { Link, useLocation } from "react-router-dom";
import SessionService from "../shared/masterData.service";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/user/userSlice";

export default function Dashboard() {
  const path = useLocation().pathname;

  const dispatch = useDispatch(); // Get the dispatch function

  return (
    <>
      <div className="flex items-center justify-between border-b-2 bg-green-400 py-2 px-4">
        <Link
          to="/dashboard"
          className={`text-gray-800 hover:text-gray-900 ${
            path === "/dashboard" ? "font-bold" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/profile-list"
          className={`text-gray-800 hover:text-gray-900 ${
            path === "/profile-list" ? "font-bold" : ""
          }`}
        >
          Profile
        </Link>
        <Link
          to="/pending"
          className={`text-gray-800 hover:text-gray-900 ${
            path === "/pending" ? "font-bold" : ""
          }`}
        >
          Expense
        </Link>
        <Link
          to="/home-slip"
          className={`text-gray-800 hover:text-gray-900 ${
            path === "/home-slip" ? "font-bold" : ""
          }`}
        >
          Pay Slips
        </Link>
        
        <Link
          to="/rating-list"
          className={`text-gray-800 hover:text-gray-900 ${
            path === "/rating-list" ? "font-bold" : ""
          }`}
        >
          Rating
        </Link>

        <button
          className="text-gray-800 hover:text-gray-900"
          onClick={() => {
            SessionService.clear();
            document.cookie = "access_token" + "=; Max-Age=-99999999;";
            dispatch(clearUser());
            window.location.href = "/signin";
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
