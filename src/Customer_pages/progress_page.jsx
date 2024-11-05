

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaExclamationTriangle } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const Progress = () => {
//   const { ins_id } = useParams();
//   const [incident, setIncident] = useState(null);
//   const [error, setError] = useState(null);
//   const [feedback, setFeedback] = useState(""); 
//   const [rating, setRating] = useState(0); 


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const incidentResponse = await axios.get(`http://localhost:8080/api/incidents/${ins_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setIncident(incidentResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch data. Please try again later.');
//       }
//     };

//     fetchData();
//   }, [ins_id]);


// const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const currentDateTime = new Date().toISOString(); 
  
//       await axios.post(`http://localhost:8080/api/incidents/${ins_id}/feedback`, 
//         { 
//             feedback, 
//             rating, 
//             feedbackDate: currentDateTime 
//         }, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
    
  
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Feedback and rating submitted successfully!',
//         confirmButtonText: 'OK'
//       });
  
//       setFeedback("");
//       setRating(0); 
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
  
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops!',
//         text: 'Failed to submit feedback. Please try again.',
//         confirmButtonText: 'OK'
//       });
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0F407B] to-[#24AF77] p-6 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-white mb-8">Incident Data</h1>

//       {error && <p className="text-red-500">{error}</p>}

//       {incident ? (
//         <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 w-full max-w-6xl">
//           <div className="flex items-center mb-4">
//             <FaExclamationTriangle className="text-red-600 text-3xl mr-2" />
//             <h2 className="text-xl font-semibold text-gray-700">{incident.title}</h2>
//           </div>
//           <p className="text-gray-600">{incident.description}</p>
//           <div className="mt-3 flex">
//   <p className="mt-2 mr-2  text-black ">
//     Status:
//   </p>
//   <span className={`inline-block px-4 py-2 rounded-full font-semibold text-white 
//     ${incident.status === 'Open' ? 'bg-green-500' : 
//       incident.status === 'In Progress' ? 'bg-yellow-500' : 
//       'bg-red-500'}`}>
//     {incident.status}
//   </span>
// </div>
         
//         </div>
//       ) : (
//         <p className="text-white">Loading incident data...</p>
//       )}    

//       <form onSubmit={handleFeedbackSubmit} className="bg-white shadow-lg rounded-lg p-4 mt-6 w-full max-w-6xl">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Submit Your Feedback</h2>
//         <textarea
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           placeholder="Your feedback here..."
//           className="border border-gray-300 p-2 w-full rounded-md"
//           rows="4"
//         />
        
//         {/* Rating Section */}
//         {/* <div className="mt-4">
//           <label className="block text-gray-700">Rating:</label>
//           <div className="flex gap-2">
//             {[1, 2, 3, 4, 5].map((rate) => (
//               <button
//                 key={rate}
//                 type="button"
//                 className={`px-3 py-1 rounded-full ${rating === rate ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                 onClick={() => setRating(rate)}
//               >
//                 {rate}
//               </button>
//             ))}
//           </div>
//         </div> */}
// <div className="flex gap-2 mt-2">
//   {[1, 2, 3, 4, 5].map((rate) => (
//     <button
//       key={rate}
//       type="button"
//       className={`px-4 py-2 transition ease-in-out font-semibold duration-200 rounded-full ${
//         rating === rate ? 'bg-blue-600 text-white ' : 'bg-gray-300'
//       } hover:bg-blue-500`}
//       onClick={() => setRating(rate)}
//     >
//       {rate}
//     </button>
//   ))}
// </div>
//         {/* {submitError && <p className="text-red-500">{submitError}</p>}
//         {submitSuccess && <p className="text-green-500">{submitSuccess}</p>} */}
        
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
//           Submit Feedback and Rating
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Progress;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Progress = () => {
  const { ins_id } = useParams();
  const [incident, setIncident] = useState(null);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(""); 
  const [rating, setRating] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const incidentResponse = await axios.get(`http://localhost:8080/api/incidents/${ins_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncident(incidentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [ins_id]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const currentDateTime = new Date().toISOString(); 

      await axios.post(`http://localhost:8080/api/incidents/${ins_id}/feedback`, 
        { 
          feedback, 
          rating, 
          feedbackDate: currentDateTime 
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Feedback and rating submitted successfully!',
        confirmButtonText: 'OK'
      });
  
      setFeedback("");
      setRating(0); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to submit feedback. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  // Function to determine the status class based on incident status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F407B] to-[#24AF77] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-8">Incident Data</h1>

      {error && <p className="text-red-500">{error}</p>}

      {incident ? (
        <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 w-full max-w-6xl">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-red-600 text-3xl mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">{incident.title}</h2>
          </div>
          <p className="text-gray-600">{incident.description}</p>
          <div className="mt-3 flex">
            <p className="mt-2 mr-2 text-black">Status:</p>
            <span className={`inline-block px-4 py-2 rounded-full font-semibold text-white ${getStatusClass(incident.status)}`}>
              {incident.status}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading incident data...</p>
      )}

      <form onSubmit={handleFeedbackSubmit} className="bg-white shadow-lg rounded-lg p-4 mt-6 w-full max-w-6xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Submit Your Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback here..."
          className="border border-gray-300 p-2 w-full rounded-md"
          rows="4"
        />
        
        {/* Rating Section */}
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((rate) => (
            <button
              key={rate}
              type="button"
              className={`px-4 py-2 transition ease-in-out font-semibold duration-200 rounded-full ${rating === rate ? 'bg-blue-600 text-white' : 'bg-gray-300'} hover:bg-blue-500`}
              onClick={() => setRating(rate)}
            >
              {rate}
            </button>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Submit Feedback and Rating
        </button>
      </form>
    </div>
  );
};

export default Progress;
