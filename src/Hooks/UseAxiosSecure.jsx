import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const UseAxiosSecure = () => {
  const { signOutUser } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (result) => {
        return result;
      },
      (error) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something Went Wrong",
            showConfirmButton: false,
            timer: 1000,
          });
          signOutUser();
          navigate("/login");
        }
      }
    );
  }, [navigate, signOutUser]);
  return axiosSecure;
};

export default UseAxiosSecure;
