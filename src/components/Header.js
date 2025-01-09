import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInDialog from "./SignInDialog";
import { Menu, X } from 'lucide-react';

export const Header = ({ handleGoogleLogin, user, setUser, handleSignOut, openDialog, setOpenDialog }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const popoverRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // Handle clicks outside of popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopover = (e) => {
    e.stopPropagation();
    setPopoverOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const defaultProfileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E";

  const handleSignOutClick = (e) => {
    e.stopPropagation();
    handleSignOut();
    setPopoverOpen(false);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              id="logo-35"
              width="40"
              height="40"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 sm:w-10 sm:h-10"
            >
              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" fill="#007AFF"></path>
              <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" fill="#312ECB"></path>
            </svg>
            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              TripAI
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              to="/create-trip"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-black hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Plan Trip
            </Link>
            {user ? (
              <div className="relative flex items-center gap-3" ref={popoverRef}>
                <button 
                  onClick={() => navigate("/my-trips")}
                  className="px-4 py-2 text-sm font-medium rounded-md text-black hover:bg-gray-100"
                >
                  My Trips
                </button>

                <button
                  className="relative focus:outline-none"
                  onClick={togglePopover}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                    <img
                      alt={user.name || "User"}
                      src={user.picture}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = defaultProfileImage;
                      }}
                    />
                  </div>
                </button>

                {popoverOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOutClick}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setOpenDialog(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-black/90 transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {user && (
                <div className="px-3 py-2 border-b border-gray-100 mb-2">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              )}
              <Link
                to="/create-trip"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plan Trip
              </Link>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/my-trips");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  >
                    My Trips
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpenDialog(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <SignInDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onSignIn={handleGoogleLogin}
      />
    </header>
  );
};