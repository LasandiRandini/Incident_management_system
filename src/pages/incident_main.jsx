

import { useState, useEffect } from "react";
import axios from "axios";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/incidents/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (incidentId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/incidents/${incidentId}/status`, { status: newStatus });
      const updatedData = data.map(item => 
        item.incidentId === incidentId ? { ...item, status: newStatus } : item
      );
      setData(updatedData); // Optionally update the local state to reflect the new status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleDescription = (incidentId) => {
    const updatedData = data.map(item => 
      item.incidentId === incidentId ? { ...item, showFullDescription: !item.showFullDescription } : item
    );
    setData(updatedData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/incidents/${id}`);
      setData(data.filter(item => item.incidentId !== id)); // Remove deleted item from local state
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.employeeName && item.employeeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.employeeTelNo && item.employeeTelNo.includes(searchQuery)) ||
    (item.employeeEmail && item.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6  w-full bg-customColor  shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Incident Management</b></h1>
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg mb-10">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = '/add_incident'}>Add Incident</button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="show" className="mr-2">Show</label>
            <select id="show" className="border border-gray-300 p-1 rounded">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-2 rounded w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Employee Name</th>
                <th className="border border-gray-300 p-2">Employee Tel.</th>
                <th className="border border-gray-300 p-2">Employee Email</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.incidentId}>
                  <td className="border border-gray-300 p-2 text-center">{item.incidentId}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.title}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.showFullDescription
                      ? item.description
                      : `${item.description.slice(0, 50)}...`}
                    <button 
                      className="text-blue-500 ml-2"
                      onClick={() => toggleDescription(item.incidentId)}
                    >
                      {item.showFullDescription ? "Show less" : "Read more"}
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.incidentId, e.target.value)}
                      className="border border-gray-300 p-2 rounded"
                    >
                       <option value="Not Assigned">Assigned</option>
                      <option value="Not Assigned">Not Assigned</option>
                      <option value="Completed">Completed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{item.employeeName || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.employeeTelNo || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.employeeEmail || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.departmentName || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button className="text-yellow-500 border border-yellow-500  rounded px-2 py-1 hover:bg-yellow-500 hover:text-white transition  mb-2" onClick={() => window.location.href = `/edit_incident/${item.incidentId}`}>Edit</button>
                    <button className="text-red-500 border border-red-500  rounded px-2 py-1 hover:bg-red-500 hover:text-white transition" onClick={() => handleDelete(item.incidentId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
