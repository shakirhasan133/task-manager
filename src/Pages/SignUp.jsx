/* eslint-disable react/no-unescaped-entities */
import Lottie from "lottie-react";
import registerLottie from "../assets/taskManagement.json"; // Replace with a relevant Lottie animation
import UseAuth from "../Hooks/UseAuth";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const { signInWithGoogleEmail, signUpWithEmail, updateUserData } = UseAuth();
  const navigate = useNavigate();

  // Handle Registration with Email & Password
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photoURL.value;

    signUpWithEmail(email, password)
      .then(() => {
        updateUserData(name, photo).then(() => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err))
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle Registration with Google
  const handleRegisterWithGoogle = () => {
    signInWithGoogleEmail()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundLight dark:bg-backgroundDark w-full px-5 md:px-0 container mx-auto my-5">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg md:max-w-4xl w-full">
        {/* Top Section */}
        <div className="rounded-t-lg bg-primary w-full py-2 flex items-center justify-center">
          <h1 className="text-2xl text-textPrimary font-semibold">
            Task Manager
          </h1>
        </div>

        <div className="w-full md:max-w-4xl grid grid-cols-1 md:grid-cols-2">
          {/* Left Section - Lottie Animation */}
          <div className="hidden md:flex items-center justify-center bg-opacity-20 rounded-l-lg">
            <Lottie animationData={registerLottie} className="w-[100vh]" />
          </div>

          {/* Right Section - Register Form */}
          <div className="p-5 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-textPrimary text-center mb-6">
              Register <span className="text-primary">Now</span>
            </h2>

            <form onSubmit={handleRegister}>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-textSecondary"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-backgroundLight dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-textSecondary"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-backgroundLight dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-textSecondary"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-backgroundLight dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Photo URL */}
              <div className="mb-6">
                <label
                  htmlFor="Photo URL"
                  className="block text-sm font-medium text-gray-700 dark:text-textSecondary"
                >
                  Photo URL
                </label>
                <input
                  type="text"
                  id="photoURL"
                  name="photourl"
                  placeholder="Photo URL"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-backgroundLight dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full text-textPrimary py-2 rounded-md shadow bg-primary hover:bg-secondary transition duration-300"
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <div className="flex items-center mt-2 gap-2">
              <p className="text-gray-600 dark:text-textSecondary">
                Already have an account?
              </p>
              <Link to={"/login"} className="text-primary">
                Login
              </Link>
            </div>

            {/* Google Register */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-textSecondary text-sm">
                Or register with
              </p>
              <button
                onClick={handleRegisterWithGoogle}
                type="button"
                className="w-full bg-backgroundLight dark:bg-gray-800 border border-primary text-primary py-2 mt-2 rounded-md hover:bg-primary hover:text-white transition duration-300"
              >
                Register with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
