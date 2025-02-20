import { useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const { signInWithGoogleEmail, signUpWithEmail, signInWithEmail } = UseAuth();

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogleEmail();
    if (user) navigate("/dashboard");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const user = isSignUp
      ? await signUpWithEmail(email, password)
      : await signInWithEmail(email, password);
    if (user) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-backgroundLight dark:bg-backgroundDark">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-primary">
          {isSignUp ? "Create an Account" : "Login"}
        </h2>

        <form onSubmit={handleEmailLogin} className="mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3 dark:bg-gray-800 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3 dark:bg-gray-800 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center my-3">or</p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-accent text-white py-2 rounded flex items-center justify-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </button>

        <p className="mt-4 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
