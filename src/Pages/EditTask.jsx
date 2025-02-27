import { useState, useEffect } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import LoadingPage from "./LoadingPage";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "to-start",
  });

  // Fetch Task Data by ID
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/task/${id}`);
      return data;
    },
  });

  // Update Form State when Data Loads
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "to-start",
      });
    }
  }, [task]);

  // Mutation to Update Task
  const mutation = useMutation({
    mutationFn: async (updatedTask) => {
      return await axiosSecure.put(`/updateTask/${id}`, updatedTask);
    },
    onSuccess: () => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          //   toast.onmouseenter = Swal.stopTimer;
          //   toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Task Updated Successfully",
      });
      navigate("/task");
    },
  });

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundLight dark:bg-backgroundDark">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-textPrimary mb-4">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-textSecondary">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-backgroundLight dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-textSecondary">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-backgroundLight dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-textSecondary">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-backgroundLight dark:bg-gray-800 dark:text-white"
            >
              <option value="to-start">To Start</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Due Date Input
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-textSecondary">
              Due Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-backgroundLight dark:bg-gray-800 dark:text-white"
            />
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full text-textPrimary py-2 rounded-md bg-primary hover:bg-secondary transition duration-300"
          >
            {mutation.isLoading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
