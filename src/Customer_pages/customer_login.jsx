import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/incidents/login",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data) {
        localStorage.setItem("token", response.data.code); 

        navigate(`/progress/${response.data.ins_id}`); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F407B] to-[#24AF77] flex flex-col justify-center items-center">
      <div className="flex justify-between w-full max-w-6xl p-3">
        <div className="w-1/3 p-4 space-y-5">
          <h2 className="text-3xl font-semibold text-gray-400">
            Track your Incident Status
          </h2>
          <div className="flex items-center space-x-3">
            <span className="material-icons text-gray-200">description</span>
            <p className="text-gray-300">Request incident progress</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="material-icons text-gray-200">email</span>
            <p className="text-gray-300">Get progress report via email</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="material-icons text-gray-200">lock</span>
            <p className="text-gray-300">Log in and check incident status</p>
          </div>
        </div>

        <div className="w-2/3 bg-blue-200 p-8 shadow-md rounded-lg">
          
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Enter Incident Code
          </h3>
          <p className="text-gray-500 text-center mb-8">
            A code has been sent to your email. Enter it below to track the
            incident.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Code"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg w-full hover:bg-green-700"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Dont have the code?{" "}
              <a className="text-blue-600">
                Request Code
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
