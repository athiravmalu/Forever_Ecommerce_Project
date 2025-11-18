import React, { useState, useRef,useEffect } from 'react'
import { Link, NavLink,useLocation,useNavigate } from 'react-router-dom'
import logo from '../Assets/logo.png'
import searchicon from '../Assets/search icon.png'
import profileicon  from '../Assets/profile-icon.png'
import vector from '../Assets/Vector.png'
import menuicon from '../Assets/menu_icon.png'
import { useSearch } from  '../Context/SearchContext'

const Navbar = () => {
   const { showSearch, setShowSearch } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


   const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("cartCount")) || 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCartCount(Number(localStorage.getItem("cartCount")) || 0);
    }, 300);

    return () => clearInterval(interval);
  }, []);


  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token"); // optional: remove auth token
    navigate("/login");
  };

  const handleSearchClick = () => {
    // Only toggle if we’re on /collection page
    if (location.pathname === "/collection") {
      setShowSearch((prev) => !prev);
    }
  };
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
  return (
    <div>
        <nav className=" fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white px-6 py-4 shadow-md">
            <div className="flex items-center">
                <Link to='/'><img src={logo} alt="logo" className="h-10 w-auto px-6"></img></Link>
            </div>

            <div className='hidden md:flex space-x-8'>
        <NavLink to="/" className={({ isActive }) =>
            isActive
              ? 'text-black font-semibold border-b-2 border-black pb-1'
              : 'text-gray-700 hover:text-black font-medium'
          }>HOME</NavLink>
        <NavLink to="/collection" className={({ isActive }) =>
            isActive
              ? 'text-black font-semibold border-b-2 border-black pb-1'
              : 'text-gray-700 hover:text-black font-medium'
          }>COLLECTION</NavLink>
        <NavLink to="/about" className={({ isActive }) =>
            isActive
              ? 'text-black font-semibold border-b-2 border-black pb-1'
              : 'text-gray-700 hover:text-black font-medium'
          }>ABOUT</NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
            isActive
              ? 'text-black font-semibold border-b-2 border-black pb-1'
              : 'text-gray-700 hover:text-black font-medium'
          }>CONTACT</NavLink>

          <a
  href="http://localhost:3001/admin"
  className="text-gray-700 hover:text-black font-medium"
>
  ADMIN
</a>

            </div>
            
            <div className="flex items-center space-x-5 mx-8 relative">
          <img
            onClick={handleSearchClick}
            src={searchicon}
            alt="search icon"
            className="cursor-pointer"
          />

          {/* ===== Profile Icon + Dropdown ===== */}
          <div className="relative" ref={dropdownRef}>
           <img
              src={profileicon}
              alt="profileicon"
              className="cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  to="/order"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

                <NavLink to="/cart" className="relative">
  <img src={vector} alt="cart" className="cursor-pointer" />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
      {cartCount}
    </span>
  )}
</NavLink>

                <img src={menuicon} alt="menuicon"  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='cursor-pointer md:hidden  w-6 h-6'></img>
                

            </div>
        </nav>
        {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 bg-white shadow-lg w-48 border border-gray-200 rounded-lg z-40">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            CONTACT
          </NavLink>
         <a
  href="http://localhost:3001/admin"
  className="mt-5 inline-block bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
>
  Admin
</a>

        </div>
      )}
        
    </div>
  )
}

export default Navbar
