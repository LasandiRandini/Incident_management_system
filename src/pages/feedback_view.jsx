
import  { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentTable = () => {
  const [incidents, setIncidents] = useState([]);

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

  return (
    <div className="container mx-auto  p-6  w-full bg-customColor  shadow-lg ">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Feedback Details</b></h1>
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
          {incidents.map((incident) => (
            <tr key={incident.ins_id}>
              <td className="border px-4 py-2">{incident.title}</td>
              <td className="border px-4 py-2">{incident.feedback}</td>
              <td className="border px-4 py-2">{incident.rating}</td>
              <td className="border px-4 py-2">{new Date(incident.feedbackDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    </div>
  );
};

export default IncidentTable;
