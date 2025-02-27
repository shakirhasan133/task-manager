import { useState, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import LoadingPage from "./../../Pages/LoadingPage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = () => {
  const axiosSecure = UseAxiosSecure();
  const [openMenuTaskId, setOpenMenuTaskId] = useState(null);
  const navigate = useNavigate();
  const { user, isRefetch } = UseAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".task-menu")) {
        setOpenMenuTaskId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    data: fetchedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/allTasks?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  useEffect(() => {
    refetch();
  }, [isRefetch, refetch]);

  const deleteTask = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/deleteTask/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      await axiosSecure.patch(`/updateTaskByDrag/${id}`, { status: newStatus });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    deleteTask.mutate(id);
  };

  const columns = [
    { title: "To Start", color: "bg-blue-500", status: "to-start" },
    { title: "In Progress", color: "bg-yellow-500", status: "in-progress" },
    { title: "Completed", color: "bg-green-500", status: "completed" },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  // ✅ Fixed Drag and Drop Logic
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const newTasks = Array.from(tasks);

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const columnTasks = newTasks.filter(
        (task) => task.status === source.droppableId
      );
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);

      setTasks(newTasks);
    } else {
      // Moving to another column
      const updatedTasks = tasks.map((task) =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      );

      setTasks(updatedTasks);
      updateTaskStatus.mutate({
        id: draggableId,
        newStatus: destination.droppableId,
      });
    }
  };

  const handleMenuToggle = (taskId) => {
    setOpenMenuTaskId((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Droppable
              key={column.status}
              droppableId={column.status}
              direction="vertical"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full min-h-[300px] bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto"
                >
                  <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <span
                      className={`h-3 w-3 rounded-full ${column.color}`}
                    ></span>
                    {column.title}
                  </h2>

                  {tasks
                    .filter((task) => task.status === column.status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-4 relative transition-transform  ${
                              snapshot.isDragging
                                ? "opacity-70 scale-105"
                                : "opacity-100"
                            }`}
                          >
                            <h3 className="font-semibold text-gray-800 dark:text-white text-base break-words mr-6">
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">
                              {task.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {task.date}
                            </p>

                            <button
                              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              onClick={() => handleMenuToggle(task._id)}
                            >
                              <EllipsisVerticalIcon className="w-5 h-5 font-bold" />
                            </button>

                            {openMenuTaskId === task._id && (
                              <div className="absolute top-10 right-4 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-10 task-menu transition-opacity duration-200">
                                <button
                                  className="block w-full text-left px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => {
                                    navigate(`/updateTask/${task._id}`);
                                    setOpenMenuTaskId(null);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="block w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDelete(task._id);
                                      }
                                    });

                                    setOpenMenuTaskId(null);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
