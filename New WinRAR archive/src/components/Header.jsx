import { Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "./images/logo_icon1.png";
import { useSelector, useDispatch } from "react-redux";
import SessionService from "../shared/masterData.service";
import { clearUser } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch(); // Get the dispatch function

  const onSignOut = () => {
    SessionService.clear();
    document.cookie = "access_token" + "=; Max-Age=-99999999;";
    dispatch(clearUser());
    window.location.href = "/signin";
  };

  return (
    <Navbar className="flex items-center justify-between border-b-2 bg-green-400 py-2 px-4">
      {/* Logo on the left */}
      <Link to="/" className="self-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* Search bar with icon on the right */}
      <form className="flex items-center rounded-md bg-white text-gray-800 px-2 py-1">
        <TextInput
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent border-none focus:outline-none"
        />
        <AiOutlineSearch className="text-gray-600" />
      </form>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-4 md:order-2 items-center">
        {/* Conditional rendering based on currentUser */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            {/* Dropdown menu items for authenticated user */}
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/dashboard">Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to="/expense-list">Expense</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/payed-slip">Pay Slip</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/payed-slip">Rating</Link>
            </Dropdown.Item>
            
            <Dropdown.Item onClick={onSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to="/signin">
              <button className="bg-gradient-to-r from-green-500 to-gray-500 text-white px-4 py-2 rounded-md">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gradient-to-r from-green-500 to-gray-500 text-white px-4 py-2 rounded-md">
                Sign Up
              </button>
            </Link>
          </>
        )}
        {/* Additional Links */}
        <Link
          to="/"
          className={`text-gray-800 hover:text-gray-900 ${
            path === "/" ? "font-bold" : ""
          }`}
        >
          Home
        </Link>
      </div>
    </Navbar>
  );
}
