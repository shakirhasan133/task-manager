import { RiMenu3Fill } from "react-icons/ri";
import UseAuth from "../../Hooks/UseAuth";

import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const DashNav = () => {
  const { isSideMenuOpen, setIsSideMenuOpen, user, TrigarRefetch } = UseAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-start");
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const addTaskData = useMutation({
    mutationFn: async (TaskData) => {
      try {
        const { data } = await axiosSecure.post("/addTask", TaskData);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      // console.log(data);
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
        title: "Task Added Successfully",
      });
      setTitle("");
      setDescription("");
      setStatus("to-start");

      // Close the modal
      document.getElementById("my_modal_1").close();
      TrigarRefetch();
      navigate("/task");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      title,
      description,
      date: new Date().toLocaleDateString(),
      status,
      email: user?.email,
    };

    addTaskData.mutate(newTask);
    e.target.reset();
  };

  //   if (!fullScreen) {
  //     if (elem.requestFullscreen) {
  //       elem.requestFullscreen();
  //     } else if (elem.mozRequestFullScreen) {
  //       // Firefox
  //       elem.mozRequestFullScreen();
  //     } else if (elem.webkitRequestFullscreen) {
  //       // Chrome, Safari and Opera
  //       elem.webkitRequestFullscreen();
  //     } else if (elem.msRequestFullscreen) {
  //       // IE/Edge
  //       elem.msRequestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       // Firefox
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       // Chrome, Safari and Opera
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       // IE/Edge
  //       document.msExitFullscreen();
  //     }
  //   }
  //   setFullscreen(!fullScreen);
  // };

  const handleSideMenuOpen = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleAddTask = () => {
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <div className="bg-backgroundDark  top-0 z-50 h-14 shadow-xl w-full sticky">
      <div className="flex  h-full justify-between items-center md:py-1 px-3 md:px-8">
        <div className="left-side flex flex-row-reverse items-center  justify-between md:justify-items-start gap-2 ">
          {/* Logo */}
          <div>
            <h1 className="text-lg font-bold text-[#ECF0F1]">Task Manager</h1>
          </div>

          <div>
            {/* Hamburger */}
            <button
              className="text-[#ECF0F1] hover:bg-[#2980B9] p-2 rounded-full"
              onClick={handleSideMenuOpen}
            >
              <RiMenu3Fill className="font-bold text-lg" />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center gap-3">
          <button
            className="bg-primary flex gap-2 px-3 items-center justify-center hover:bg-secondary text-[#ECF0F1] rounded-full p-2 "
            onClick={handleAddTask}
          >
            <FiPlusCircle className="font-bold text-xl" />
            <span> New Task</span>
          </button>

          <div className="bg-primary rounded-full p-[2px] ">
            <img
              className="w-8 h-8 rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:block">
            <h3 className="font-bold text-md text-[#ECF0F1]">
              {user?.displayName}
            </h3>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_1"
        className="modal w-full md:min-w-xl mx-auto p-5 my-auto rounded-lg shadow-xl relative transition-all animation"
      >
        <div className="modal-box">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            {/* Task Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Task Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="to-start">To Start</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md shadow hover:bg-primary-dark transition duration-300"
            >
              Add Task
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn absolute top-3 right-3 text-2xl text-red-500">
                <IoIosCloseCircle />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DashNav;
