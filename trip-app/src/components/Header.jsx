import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
              <img src={logo} className="h-20   w-auto"/>
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center">
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to="aboutus"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              About Us
            </Link>
            <Link
              to="tripcreate"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Create Trip
            </Link>
            <Link
              to="tripupdate"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
            >
              Update Trip
            </Link>
            {/* <Link
              to="tripview"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
            >
              View Trip
            </Link> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
