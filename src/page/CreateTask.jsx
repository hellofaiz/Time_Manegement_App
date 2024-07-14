// src/pages/CreateTask.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To-do");
  const [loading, setLoading] = useState(false);
  const [hasTasks, setHasTasks] = useState(false);
  const navigate = useNavigate();

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
          if (response.data.length > 0) {
            setHasTasks(true);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      const newTask = {
        title,
        description,
        status,
      };

      setLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/tasks`,
          newTask,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log("Task creation response:", response.data);
        setTitle("");
        setDescription("");
        setStatus("To-do");
        toast.success("Task created successfully!");
        setLoading(false);
        navigate("/task-list");
      } catch (error) {
        console.error("Task creation failed:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
        toast.error("Failed to create task");
        setLoading(false);
      }
    } else {
      toast.error("You need to be logged in to create a task");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6">Create Task</h1>
      <form onSubmit={handleCreateTask} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-do">To-do</option>
            <option value="Progress">Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
          {hasTasks && (
            <button
              type="button"
              onClick={() => navigate("/task-list")}
              className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              View Task List
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
