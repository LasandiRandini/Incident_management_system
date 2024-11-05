import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  
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

  const toggleDescription = (incidentId) => {
    const updatedData = data.map(item => 
      item.incidentId === incidentId ? { ...item, showFullDescription: !item.showFullDescription } : item
    );
    setData(updatedData);
  };

  // Filter based on employee, department, and search query
  const filteredData = data.filter(item =>
    (selectedEmployee === "" || item.employeeName?.toLowerCase().includes(selectedEmployee.toLowerCase())) &&
    (selectedDepartment === "" || item.departmentName?.toLowerCase().includes(selectedDepartment.toLowerCase())) 
    
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Download PDF of filtered data
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Filtered Incident Data", 14, 16);

    const headers = [['Incident ID', 'Title', 'Description', 'Employee Name', 'Employee Tel.', 'Employee Email', 'Department']];
    
    const dataRows = filteredData.map(item => [
      item.incidentId,
      item.title,
      item.description,
      item.employeeName || 'N/A',
      item.employeeTelNo || 'N/A',
      item.employeeEmail || 'N/A',
      item.departmentName || 'N/A'
    ]);

    // Add table to the PDF
    doc.autoTable({
      startY: 22,
      head: headers,
      body: dataRows,
      theme: 'grid',
      headStyles: { fillColor: [49, 181, 88] },
      styles: { fontSize: 10 },
    });

    // Save the PDF
    doc.save('filtered_incidents.pdf');
  };

  return (
    <div className="p-6 w-full bg-customColor shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Incident Management</b></h1>
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg mb-10">

        <div className="flex justify-between items-center mb-4">
          
          
        </div>

        {/* Employee Filter */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="employeeFilter" className="mr-2">Filter by Employee</label>
            <input
              id="employeeFilter"
              type="text"
              className="border border-gray-300 p-2 rounded w-64"
              placeholder="Enter employee name"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            />
          </div>

          {/* Department Filter */}
          <div>
            <label htmlFor="departmentFilter" className="mr-2">Filter by Department</label>
            <input
              id="departmentFilter"
              type="text"
              className="border border-gray-300 p-2 rounded w-64"
              placeholder="Enter department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
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
                <th className="border border-gray-300 p-2">Employee Name</th>
                <th className="border border-gray-300 p-2">Employee Tel.</th>
                <th className="border border-gray-300 p-2">Employee Email</th>
                <th className="border border-gray-300 p-2">Department</th>
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
                  <td className="border border-gray-300 p-2 text-center">{item.employeeName || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.employeeTelNo || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.employeeEmail || 'N/A'}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.departmentName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>

        {/* Download PDF Button */}
        <div className="mt-4">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Download Filtered Data as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
