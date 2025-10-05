import { Link } from "react-router-dom";
import { useState } from "react";

export const NavBar = ({ isActive, user, onLogout, isLoading, admin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  };

  const getDisplayName = () => {
    if (!user) return "";
    return user.firstName || user.email || "User";
  };
  

  if (admin) {

    return (
      <nav className={isActive ? " text-black" : " text-white"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center h-16 justify-between">
            {/* Left Links - Hidden on mobile */}
            <div className="hidden md:flex space-x-4">
              {/* <Link to="/" className="hover:text-blue-300">
                Home
              </Link>

              <>
                <Link to="/reserve" className="hover:text-blue-300">
                  Reserve a Room
                </Link>
                <Link to="/report" className="hover:text-blue-300">
                  Report an Issue
                </Link>
              </> */}
            </div>

            {/* Center Name */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-bold">
              INPTCAMPUS
            </div>

            {/* Right Links - Hidden on mobile */}
            <div className="hidden md:flex space-x-4 items-center">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 hover:text-blue-300 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {getDisplayName().charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:block">{getDisplayName()}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{getDisplayName()}</div>
                        {user.email && (
                          <div className="text-gray-500">{user.email}</div>
                        )}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 rounded-md mt-2">
                <>
                  <div className="border-t border-white/20 mt-2 pt-2">
                    <div className="px-3 py-2 text-base text-blue-200">
                      {getDisplayName()}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base hover:text-blue-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
  return (
    <nav className={isActive ? " text-black" : " text-white"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-16 justify-between">
          {/* Left Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/reserve" className="hover:text-blue-300">
                  Reserve a Room
                </Link>
                <Link to="/report" className="hover:text-blue-300">
                  Report an Issue
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="hover:text-blue-300">
                  Reserve a Room
                </Link>
                <Link to="/auth/login" className="hover:text-blue-300">
                  Report an Issue
                </Link>
              </>
            )}
          </div>

          {/* Center Name */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-bold">
            INPTCAMPUS
          </div>

          {/* Right Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 hover:text-blue-300 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{getDisplayName()}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{getDisplayName()}</div>
                      {user.email && (
                        <div className="text-gray-500">{user.email}</div>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    {/* <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth/login" className="hover:text-blue-300">
                Login/Register
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 rounded-md mt-2">
              <Link
                to="/"
                className="block px-3 py-2 text-base hover:text-blue-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/reserve"
                    className="block px-3 py-2 text-base hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reserve a Room
                  </Link>
                  <Link
                    to="/report"
                    className="block px-3 py-2 text-base hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Report an Issue
                  </Link>
                  <div className="border-t border-white/20 mt-2 pt-2">
                    <div className="px-3 py-2 text-base text-blue-200">
                      {getDisplayName()}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-base hover:text-blue-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {/* <Link
                      to="/settings"
                      className="block px-3 py-2 text-base hover:text-blue-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base hover:text-blue-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="block px-3 py-2 text-base hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reserve a Room
                  </Link>
                  <Link
                    to="/auth/login"
                    className="block px-3 py-2 text-base hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Report an Issue
                  </Link>
                  <Link
                    to="/auth/login"
                    className="block px-3 py-2 text-base hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login/Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
