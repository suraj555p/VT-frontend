import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UploadVideo from './components/Video/UploadVideo';
import Logout from './components/Auth/Logout';
import ChannelProfile from './pages/ChannelProfile';
import MyVideos from './components/Video/MyVideos';
import UpdateAvatar from './components/Settings/UpdateAvatar';
import UpdateCover from './components/Settings/UpdateCover';
import ChangePassword from './components/Settings/ChangePassword';

function App() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedUser = localStorage.getItem("videotube-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)?.user);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          VideoTube
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <div className={`md:flex items-center gap-4 ${mobileMenuOpen ? "block" : "hidden"} absolute md:relative top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent p-4 md:p-0`}>
          <Link to="/" className="block md:inline-block text-gray-700 dark:text-gray-200 hover:text-purple-600 font-medium mb-2 md:mb-0">
            Home
          </Link>

          <button
            onClick={toggleTheme}
            className="block md:inline-block text-sm px-3 py-1 rounded-full border border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-gray-800 transition mb-2 md:mb-0"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {user ? (
            <>
              <Link to="/upload" className="block md:inline-block text-gray-700 dark:text-gray-200 hover:text-purple-600 font-medium mb-2 md:mb-0">
                Upload
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <img
                    src={user.avatarImage || "/default-avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border-2 border-purple-500 group-hover:ring-2 group-hover:ring-purple-300 transition duration-150"
                  />
                  <span className="text-purple-700 dark:text-purple-300 font-semibold group-hover:underline truncate max-w-[120px]">
                    @{user.username}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300">Signed in as</p>
                      <p className="text-md font-bold text-purple-600 dark:text-purple-300 truncate">@{user.username}</p>
                    </div>
                    <div className="py-1">
                      <Link to={`/channel/${user.username}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        View Profile
                      </Link>
                      <Link to="/my-videos" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        My Videos
                      </Link>
                      <Link to="/update-avatar" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Update Avatar
                      </Link>
                      <Link to="/update-cover" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Update Cover Image
                      </Link>
                      <Link to="/change-password" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Change Password
                      </Link>
                      <Link to="/logout" className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900">
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="block md:inline-block text-gray-700 dark:text-gray-200 hover:text-purple-600 font-medium mb-2 md:mb-0">
                Login
              </Link>
              <Link to="/register" className="block md:inline-block text-gray-700 dark:text-gray-200 hover:text-purple-600 font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="min-h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
          <Route path="/channel/:username" element={<ChannelProfile />} />
          <Route path="/update-avatar" element={<UpdateAvatar />} />
          <Route path="/update-cover" element={<UpdateCover />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/my-videos" element={<MyVideos />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
