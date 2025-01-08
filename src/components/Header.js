import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInDialog from "./SignInDialog"; // Import the SignInDialog component

export const Header = ({ handleGoogleLogin, user, setUser, handleSignOut, openDialog, setOpenDialog }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Update user state if already logged in
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const togglePopover = () => setPopoverOpen((prev) => !prev);

  return (
    <header className="fixed w-full bg-white backdrop-blur-md z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              id="logo-35"
              width="50"
              height="39"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>
              <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                className="ccustom"
                fill="#312ECB"
              ></path>
            </svg>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              TripAI
            </span>
          </Link>

          {/* Navigation and User Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/create-trip"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-primary-50 hover:bg-primary-100 transition duration-150 ease-in-out"
            >
              Plan Trip
            </Link>
            {user ? (
              <div className="relative flex items-center gap-3">
                <button className="rounded-full" onClick={() =>navigate("/my-trips")}>My Trips</button>

                {/* Profile Image */}
                <img
                  alt="user profile"
                  src={user.picture?user.picture:"https://images.unsplash.com/photo-1531715047058-33b6c9df7897?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  className="h-10 w-10 rounded-full cursor-pointer border border-gray-300"
                  onClick={togglePopover}
                />

                {/* Popover for Sign Out */}
                {popoverOpen && (
                  <div
                    className="absolute top-full mt-2 right-0 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                    onMouseLeave={() => setPopoverOpen(false)}
                  >
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setOpenDialog(true)} // Set dialog to open
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-primary-600 hover:bg-primary-700 transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <SignInDialog
        isOpen={openDialog} // Use openDialog passed from App.js
        onClose={() => setOpenDialog(false)} // Close dialog
        onSignIn={handleGoogleLogin} // Pass login handler
      />
    </header>
  );
};
