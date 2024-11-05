

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const IncidentTable = () => {
//   const [incidents, setIncidents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of incidents per page

//   useEffect(() => {
//     // Fetch data from API
//     axios.get('http://localhost:8080/api/incidents/details')
//       .then(response => {
//         setIncidents(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the incident data!", error);
//       });
//   }, []);

//   // Calculate the incidents for the current page
//   const indexOfLastIncident = currentPage * itemsPerPage;
//   const indexOfFirstIncident = indexOfLastIncident - itemsPerPage;
//   const currentIncidents = incidents.slice(indexOfFirstIncident, indexOfLastIncident);

//   const totalPages = Math.ceil(incidents.length / itemsPerPage);

//   // Handle Previous and Next page buttons
//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="  p-6   bg-customColor shadow-lg">
//       <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
//         <h1><b>Feedback Details</b></h1>
//       </div>

//       <div className="p-4 w-full bg-white rounded-lg shadow-lg mb-10">
//         <table className="w-full border-collapse border border-gray-300 text-center">
//           <thead>
//             <tr>
//               <th className="px-4 py-4 border">Incident Name</th>
//               <th className="px-4 py-4 border">Feedback</th>
//               <th className="px-4 py-4 border">Rating</th>
//               <th className="px-4 py-4 border">Feedback Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentIncidents.map((incident) => (
//               <tr key={incident.ins_id}>
//                 <td className="border px-4 py-2">{incident.title}</td>
//                 <td className="border px-4 py-2">{incident.feedback}</td>
//                 <td className="border px-4 py-2">{incident.rating}</td>
//                 <td className="border px-4 py-2">{new Date(incident.feedbackDate).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination controls */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncidentTable;

import { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentTable = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of incidents per page

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:8080/api/incidents/details')
      .then(response => {
        setIncidents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the incident data!", error);
      });
  }, []);

  // Filter incidents based on the search term
  // const filteredIncidents = incidents.filter((incident) =>
  //   incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   incident.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   incident.rating.toString().includes(searchTerm) ||
  //   new Date(incident.feedbackDate).toLocaleDateString().includes(searchTerm)
  // );
  const filteredIncidents = incidents.filter((incident) =>
    (incident.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (incident.feedback?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (incident.rating?.toString() || '').includes(searchTerm) ||
    (new Date(incident.feedbackDate).toLocaleDateString().includes(searchTerm))
  );
  // Pagination logic
  const indexOfLastIncident = currentPage * itemsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - itemsPerPage;
  const currentIncidents = filteredIncidents.slice(indexOfFirstIncident, indexOfLastIncident);
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage);

  // Handle Previous and Next page buttons
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-customColor shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Feedback Details</b></h1>
      </div>

      {/* Search bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search incidents..."
          className="px-4 py-2 w-full border rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg mb-10">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="px-4 py-4 border">Incident Name</th>
              <th className="px-4 py-4 border">Feedback</th>
              <th className="px-4 py-4 border">Rating</th>
              <th className="px-4 py-4 border">Feedback Date</th>
            </tr>
          </thead>
          <tbody>
            {currentIncidents.length > 0 ? (
              currentIncidents.map((incident) => (
                <tr key={incident.ins_id}>
                  <td className="border px-4 py-2">{incident.title}</td>
                  <td className="border px-4 py-2">{incident.feedback}</td>
                  <td className="border px-4 py-2">{incident.rating}</td>
                  <td className="border px-4 py-2">
                    {new Date(incident.feedbackDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 border text-center">
                  No incidents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentTable;
