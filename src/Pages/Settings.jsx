import { useState } from "react";
import { FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router";

const Settings = () => {
  const { signOutUser, user } = UseAuth();
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Settings
        </h2>

        {/* User Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full text-2xl">
            {user ? (
              <img src={user?.photoURL} className="rounded-full w-full" />
            ) : (
              <FiUser />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user?.displayName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        {/* <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-md mb-6">
          <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className="text-gray-800 dark:text-white p-2 rounded-md"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div> */}

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
