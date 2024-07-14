import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/tasks/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );
          setTasks(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch tasks");
          setLoading(false);
        }
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.error("Failed to delete task:", error);
        toast.error("Failed to delete task");
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user && editingTask) {
      try {
        await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/tasks/${editingTask.id}`,
          editingTask,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setTasks(
          tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
        );
        toast.success("Task updated successfully!");
        setEditingTask(null);
      } catch (error) {
        console.error("Failed to update task:", error);
        toast.error("Failed to update task");
      }
    }
  };

  const filteredTasks = useMemo(() => {
    return filter ? tasks.filter((task) => task.status === filter) : tasks;
  }, [tasks, filter]);

  if (tasks.length === 0) {
    return (
      <div>
        <h1 className="text-2xl m-4"> No Task Found Create new</h1>
        <Link
          to="/create-task"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Create Task
        </Link>{" "}
      </div>
    );
  }

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl mb-4">Task List</h1>
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/create-task"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Create Task
        </Link>
        <div>
          <label htmlFor="filter" className="mr-2">
            Filter by status:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="To-do">To-do</option>
            <option value="Progress">Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="overflow-x-auto">
          {filteredTasks.length == 0 && <h4>No Data Found...</h4>}
          {filteredTasks.length != 0 && (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left ">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-t">
                    <td className="px-4 py-2 ">{task.title}</td>
                    <td className="px-4 py-2 ">{task.description}</td>
                    <td className="px-2 text-center py-2 ">
                      <span
                        className={`px-2 py-1 rounded-full text text-black ${
                          task.status === "To-do"
                            ? "bg-gray-200 text-black text-xs"
                            : task.status === "Progress"
                            ? "bg-blue-500 text-black text-xs"
                            : "bg-green-500 text-black text-xs"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="text-center py-2 ">
                      <button
                        onClick={() => handleEdit(task)}
                        className=" text-black py-1 rounded mr-2"
                      >
                        <FilePenIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className=" text-black py-1 rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {editingTask && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                value={editingTask.status}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, status: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="To-do">To-do</option>
                <option value="Progress">Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
export default TaskList;
