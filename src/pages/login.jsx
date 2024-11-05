import { useState } from 'react';
import logo from '../assets/SLT_logo.png';
import image1 from '../assets/image 1.png';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        username,
        password
      });
      console.log('Login successful:', response.data);
      setSuccess("Login successful!");
      setError(null); 

      
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError('Failed to log in. Please check your credentials.');
      setSuccess(null); 
    }
  };

  return (
    <div className="flex h-screen">
      
      <div
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image1})` }} 
      >
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-80"></div>

        
        <div className="relative flex flex-col justify-center items-center h-full text-white p-8">
          
          <img src={logo} alt="SLT Mobitel" className="mb-8 w-64" />
          <h1 className="text-4xl font-bold mb-4">Welcome to SLT Mobitel</h1>
          <button
            className="border border-white px-6 py-2 rounded-full"
            onClick={() => window.location.href = '/'}  
          >
            Sign up
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md w-full md:w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Sign in</h2>
          
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <span  className="text-sm text-blue-600">Forgot Password?</span>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <p className="text-gray-500">or continue with</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button>
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" className="w-8 h-8" />
                </button>
                <button>
                  <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Google Chrome" className="w-8 h-8 mr-2" />
                </button>
              </div>
            </div>
          </form>
       
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Don’t have an account? <a href="/" className="text-blue-500">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from 'react';

// import logo from '../assets/SLT_logo.png';
// import image1 from '../assets/image 1.png';
// import axios from 'axios';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/admin/login', {
//         username,
//         password
//       });
//       console.log('Login successful:', response.data);
//       setSuccess('Login successful!');
//       setError(null);

//       window.location.href = '/dashboard';
//     } catch (error) {
//       console.error('Login error:', error.response?.data || error.message);
//       setError('Failed to log in. Please check your credentials.');
//       setSuccess(null);
//     }
//   };

//   const handleGoogleLoginRedirect = () => {
   
//     window.location.href = 'http://localhost:8080/api/auth/google';
//   };

//   return (
//     <div className="flex h-screen">
//       <div
//         className="hidden md:block w-1/2 bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${image1})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-80"></div>
//         <div className="relative flex flex-col justify-center items-center h-full text-white p-8">
//           <img src={logo} alt="SLT Mobitel" className="mb-8 w-64" />
//           <h1 className="text-4xl font-bold mb-4">Welcome to SLT Mobitel</h1>
//           <button
//             className="border border-white px-6 py-2 rounded-full"
//             onClick={() => window.location.href = '/'}
//           >
//             Sign up
//           </button>
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
//         <div className="bg-white p-10 rounded-lg shadow-md w-full md:w-96">
//           <h2 className="text-3xl font-bold text-center mb-6">Sign in</h2>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {success && <p className="text-green-500 text-center">{success}</p>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter your User Name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div className="flex justify-between items-center mb-6">
//               <label className="inline-flex items-center">
//                 <input type="checkbox" className="form-checkbox" />
//                 <span className="ml-2 text-gray-700">Remember me</span>
//               </label>
//               <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
//             >
//               Login
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <p className="text-gray-500">or continue with</p>
//             <div className="flex justify-center space-x-4 mt-4">
//               <button>
//                 <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" className="w-8 h-8" />
//               </button>
//               <button onClick={handleGoogleLoginRedirect} className="flex items-center">
//                 <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Google Chrome" className="w-8 h-8 mr-2" />
//                 <span>Sign in with Google</span>
//               </button>
//             </div>
//           </div>

//           <div className="text-center mt-6">
//             <p className="text-gray-500">
//               Don’t have an account? <a href="/" className="text-blue-500">Register</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
