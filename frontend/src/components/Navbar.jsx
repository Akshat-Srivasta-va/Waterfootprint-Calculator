import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, LogOut, LogIn, UserPlus } from "lucide-react";

const NavItem = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen((s) => !s);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-teal-600 font-bold text-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0C6 8.5 12 2 12 2z" />
            </svg>
            Water Footprint
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
            <NavItem to="/about" onClick={() => setIsOpen(false)}>About</NavItem>
            <NavItem to="/form" onClick={() => setIsOpen(false)}>Calculator</NavItem>
            <NavItem to="/contact" onClick={() => setIsOpen(false)}>Contact</NavItem>
            <NavItem to="/donate" onClick={() => setIsOpen(false)}>Donate</NavItem>
            <NavItem to="/water-saving-tips" onClick={() => setIsOpen(false)}>Tips</NavItem>
            <NavItem to="/waterfootprint" onClick={() => setIsOpen(false)}>Waterfootprint</NavItem>
            <NavItem to="/news" onClick={() => setIsOpen(false)}>News</NavItem>

            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <button
                  id="navbar-logout"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div id="mobile-menu" className={`${isOpen ? "block" : "hidden"} md:hidden pb-4`}>
          <div className="space-y-1">
            <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
            <NavItem to="/about" onClick={() => setIsOpen(false)}>About</NavItem>
            <NavItem to="/form" onClick={() => setIsOpen(false)}>Calculator</NavItem>
            <NavItem to="/contact" onClick={() => setIsOpen(false)}>Contact</NavItem>
            <NavItem to="/donate" onClick={() => setIsOpen(false)}>Donate</NavItem>
            <NavItem to="/water-saving-tips" onClick={() => setIsOpen(false)}>Tips</NavItem>
            <NavItem to="/waterfootprint" onClick={() => setIsOpen(false)}>Waterfootprint</NavItem>
            <NavItem to="/news" onClick={() => setIsOpen(false)}>News</NavItem>
            {user ? (
              <>
                <NavItem to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavItem>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-600 font-medium">Logout</button>
              </>
            ) : (
              <>
                <NavItem to="/login" onClick={() => setIsOpen(false)}>Login</NavItem>
                <NavItem to="/register" onClick={() => setIsOpen(false)}>Register</NavItem>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;