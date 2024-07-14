// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("user", user);
        const { email, displayName, photoURL, uid } = user;
        await axios.post("http://localhost:5000/users/register", {
          email,
          name: displayName,
          photo: photoURL,
          uid,
        });
        setUser(user);
        navigate("/create-task");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">
        <Link to="/">Time Management</Link>
      </div>
      <div>
        {user ? (
          <div className="relative">
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div
                className="absolute  right-0 mt-2 py-2 px-4 bg-white cursor-pointer rounded-lg shadow-xl hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
                {/* <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                  Logout
                </button> */}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login / Signup
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
