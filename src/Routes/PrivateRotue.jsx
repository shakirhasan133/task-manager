import UseAuth from "../Hooks/UseAuth";
import LoadingPage from "../Pages/LoadingPage";
import Login from "../Pages/Login";

const PrivateRotue = ({ children }) => {
  const { user, Loading } = UseAuth();
  if (Loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (user) {
    return children;
  }
  if (!user) {
    return <Login></Login>;
  }
};

export default PrivateRotue;
