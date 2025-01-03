import PropTypes from 'prop-types';
import { Search, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'

const NavbarDashboard = ({ onMenuClick }) => {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="text-zinc-400 hover:text-white p-2"
              onClick={onMenuClick}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* <div className="flex items-center lg:justify-between pr-5">
              <Link to="/" className="border-indigo-500 text-gray-400 inline-flex items-center px-1 pt-1  text-md font-medium">
                    Home
                </Link>
              <Link to="/" className="border-indigo-500 text-gray-400 inline-flex items-center px-1 pt-1  text-md font-medium">
                    dashboard
                </Link>
          </div> */}

          {/* Center - Search bar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-lgx w-full"> {/* Increased width to max-w-lg */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full rounded-md border-0 bg-zinc-800 py-2 pl-10 pr-3 text-zinc-300 placeholder:text-zinc-500 focus:bg-zinc-700 focus:ring-2 focus:ring-zinc-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Right side - User icon */}
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:text-white"
            >
              <User className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

NavbarDashboard.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default NavbarDashboard;
