import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  // const [user] = useAuthState(auth);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    if (user) {
      navigate("/create-task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="container mx-auto flex flex-col items-center px-6 py-12">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Manage Your Time Efficiently with{" "}
          <span className="text-blue-600">Time Management</span>
        </h2>
        <p className="text-lg text-center mb-8">
          Our app helps you keep track of your tasks and stay organized. Manage
          your to-dos, set priorities, and never miss a deadline again.
        </p>
        {user && (
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Started
          </button>
        )}
      </main>
      <footer className="w-full py-6 bg-gray-800 text-white mt-auto">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-sm">
            &copy; 2024 Time Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
