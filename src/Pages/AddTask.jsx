import { useEffect, useState } from "react";

const AddTask = () => {
  const [status, setStatus] = useState("to-start");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      id: Date.now(), // Unique ID
      title,
      description,
      date: new Date().toLocaleDateString(),
      status,
    };
  };

  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto mt-10">
      <dialog id="my_modal_1" className="modal min-w-xl mx-auto p-5">
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
                name="title"
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
                name="description"
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddTask;
