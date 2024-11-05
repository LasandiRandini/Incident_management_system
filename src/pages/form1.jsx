

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const IncidentForm = () => {
  const [customerData, setCustomerData] = useState({
    c_name: "",
    c_tel_no: "",
    c_email: "",
  });
  const [employeeId, setEmployeeId] = useState("");
  const [incidentData, setIncidentData] = useState({
    type: "",
    title: "",
    description: "",
  });
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/employees/all");
        setEmployees(response.data || []); 
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);
  
 
  const handleCustomerSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/customers/findByTelNo/${customerData.c_tel_no}`);
        if (response.data) {
            setIsExistingCustomer(true);
            setCustomerData({
                c_name: response.data.c_name,
                c_tel_no: response.data.c_tel_no,
                c_email: response.data.c_email,
            });
            setCustomerId(response.data.c_id);
        } else {
            setIsExistingCustomer(false);
           
            Swal.fire({
                icon: 'warning',
                title: 'Customer Not Found',
                text: 'No customer exists with the provided telephone number.',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error("Customer search failed:", error);
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error searching for the customer. Please try again later.',
            confirmButtonText: 'OK'
        });
    }
};

 

  const handleCustomerSave = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/customers/add",
            customerData
        );
        setCustomerData({ c_name: "", c_tel_no: "", c_email: "" });
        
        if (response.data) {
            console.log("Customer ID:", response.data.c_id);
            console.log("Customer Name:", response.data.c_name);
            setCustomerData({
                c_name: response.data.c_name,
                c_tel_no: response.data.c_tel_no,
                c_email: response.data.c_email,
            });
            setCustomerId(response.data.c_id);
            
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Customer saved successfully!',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error("Customer save failed:", error);
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to save the customer. Please try again.',
            confirmButtonText: 'OK'
        });
    }
};



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!customerId) {
      Swal.fire({
          icon: 'warning',
          title: 'Missing Customer',
          text: 'Please add a customer before submitting the incident.',
          confirmButtonText: 'OK'
      });
      return;
  }

  if (!employeeId) {
      Swal.fire({
          icon: 'warning',
          title: 'Missing Employee',
          text: 'Please select an employee before submitting the incident.',
          confirmButtonText: 'OK'
      });
      return;
  }

  try {
      const incidentPayload = {
          title: incidentData.title,
          description: incidentData.description,
          type: incidentData.type,
          employee: { emp_id: employeeId },
          customer: { c_id: customerId },
          status: "assigned",
      };

      console.log("Submitting payload:", incidentPayload);

      const response = await axios.post("http://localhost:8080/api/incidents/addIncident", incidentPayload);

      const incidentId = response.data.ins_id; 

      Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Incident submitted successfully!',
          confirmButtonText: 'OK'
      });

      setIncidentData({ type: "", title: "", description: "" });

      
      await handleSendEmail(incidentId);
  } catch (error) {
      console.error("Incident submission failed:", error);
      
      
      Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Incident submission failed. Please try again.',
          confirmButtonText: 'OK'
      });
  }
};


const handleSendEmail = async (incidentId) => {
  if (!incidentId) {
    console.error("Incident ID not found.");
    return;
  }

  try {
    
    await axios.get(`http://localhost:8080/api/incidents/sendEmail/${incidentId}`);

    Swal.fire({
      title: "Success!",
      text: "Incident data has been submitted and the email has been sent.",
      icon: "success",
    }).then(() => {
      window.location.href = "incidentmain";
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    
  }
};

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateTelNo = (tel) => {
    const regex = /^\d{10}$/;
    return regex.test(tel);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setCustomerData({ ...customerData, c_email: email });
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleTelChange = (e) => {
    const telNo = e.target.value;
    setCustomerData({ ...customerData, c_tel_no: telNo });

    if (!validateTelNo(telNo)) {
      setTelError("Please enter a valid 10-digit phone number.");
    } else {
      setTelError("");
    }
  };
  
  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-white p-8 rounded-lg shadow-md mx-auto"
>
  <div>
    <label htmlFor="customerTel" className="block text-sm font-medium text-gray-700">
      Customer Tel.
    </label>
    <div className="flex">
      <input
        id="customerTel"
        type="tel"
        value={customerData.c_tel_no}
        onChange={handleTelChange}
        className="mt-1 block w-full py-2 px-3 mr-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {telError && <p className="text-red-600 text-sm">{telError}</p>}
      <button
        type="button"
        onClick={handleCustomerSearch}
        className="py-2 px-4 bg-green-500 text-white rounded-md justify-end shadow-lg mt-2"
      >
        Search Customer
      </button>
    </div>
  </div>

  {isExistingCustomer ? (
    <div>
      <p className="mt-4 text-gray-700">
        Customer Name: {customerData.c_name}
      </p>
      <p className="mt-2 text-gray-700">
        Customer Email: {customerData.c_email}
      </p>
    </div>
  ) : (
    <div>
      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
        Customer Name
      </label>
      <input
        id="customerName"
        type="text"
        value={customerData.c_name}
        onChange={(e) =>
          setCustomerData({ ...customerData, c_name: e.target.value })
        }
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">
        Customer Email
      </label>
      <input
        id="customerEmail"
        type="email"
        value={customerData.c_email}
        onChange={handleEmailChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
      <button
        type="button"
        onClick={handleCustomerSave}
        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg mt-4"
      >
        Save Customer
      </button>
    </div>
  )}

  <div>
    <label htmlFor="incidentTitle" className="block text-sm font-medium text-gray-700">
      Incident Title
    </label>
    <input
      id="incidentTitle"
      type="text"
      value={incidentData.title}
      onChange={(e) =>
        setIncidentData({ ...incidentData, title: e.target.value })
      }
      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>

  <div>
    <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700">
      Incident Description
    </label>
    <textarea
      id="incidentDescription"
      value={incidentData.description}
      onChange={(e) =>
        setIncidentData({ ...incidentData, description: e.target.value })
      }
      className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      rows="5"
    />
  </div>

  <div>
    <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700">
      Incident Type
    </label>
    <select
      id="incidentType"
      value={incidentData.type}
      onChange={(e) => setIncidentData({ ...incidentData, type: e.target.value })}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">Select Incident Type</option>
      <option value="Crucial">Crucial</option>
      <option value="Urgent">Urgent</option>
      <option value="High Priority">High Priority</option>
      <option value="Normal">Normal</option>
    </select>
  </div>

  <div>
    <label htmlFor="employeeSelect" className="block text-sm font-medium text-gray-700">
      Select Employee
    </label>
    <select
      id="employeeSelect"
      value={employeeId}
      onChange={(e) => setEmployeeId(e.target.value)}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="" disabled>
        Select an employee
      </option>
      {employees.map((employee) => (
        <option key={employee.emp_id} value={employee.emp_id}>
          {employee.emp_name}
        </option>
      ))}
    </select>
  </div>

  <div className="flex justify-end mt-4">
    <button
      type="submit"
      className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg mr-5"
    >
      Submit Incident
    </button>
    <button
      type="button"
      onClick={handleSendEmail}
      className="py-2 px-4 bg-green-600 text-white rounded-md shadow-lg"
    >
      Save and Send Email
    </button>
  </div>
</form>

//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 bg-white p-8 rounded-lg shadow-md mx-auto"
//     >
     
//       <div >
//         <label className="block text-sm font-medium text-gray-700">
//           Customer Tel.
//         </label>
//         <div className="flex">
//         <input
//           type="tel"
//           value={customerData.c_tel_no}
//           onChange={handleTelChange}
//           className="mt-1 block w-full py-2 px-3 mr-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//         {telError && <p className="text-red-600 text-sm">{telError}</p>}
//         <button
//           type="button"
//           onClick={handleCustomerSearch}
//           className="py-2 px-4 bg-green-500 text-white rounded-md  justify-end shadow-lg mt-2"
//         >
//           Search Customer
//         </button>
//       </div>
//       </div>
   
//       {isExistingCustomer ? (
//         <div>
//           <p className="mt-4 text-gray-700">
//             Customer Name: {customerData.c_name}
//           </p>
//           <p className="mt-2 text-gray-700">
//             Customer Email: {customerData.c_email}
//           </p>
//         </div>
//       ) : (
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Customer Name
//           </label>
//           <input
//             type="text"
//             value={customerData.c_name}
//             onChange={(e) =>
//               setCustomerData({ ...customerData, c_name: e.target.value })
//             }
//             className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           <label className="block text-sm font-medium text-gray-700">
//             Customer Email
//           </label>
//           <input
//             type="email"
//             value={customerData.c_email}
//             onChange={handleEmailChange}
//             className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
//           <button
//             type="button"
//             onClick={handleCustomerSave}
//             className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg mt-4"
//           >
//             Save Customer
//           </button>
//         </div>
//       )}

      
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Incident Title
//         </label>
//         <input
//           type="text"
//           value={incidentData.title}
//           onChange={(e) =>
//             setIncidentData({ ...incidentData, title: e.target.value })
//           }
//           className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Incident Description
//         </label>
//         <textarea
//           value={incidentData.description}
//           onChange={(e) =>
//             setIncidentData({ ...incidentData, description: e.target.value })
//           }
//           className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           rows="5"
//         />
//       </div>
     
// <div>
//   <label className="block text-sm font-medium text-gray-700">
//     Incident Type
//   </label>
//   <select
//     value={incidentData.type}
//     onChange={(e) => setIncidentData({ ...incidentData, type: e.target.value })}
//     className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//   >
//     <option value="">Select Incident Type</option>
//     <option value="Crusial">Crusial</option>
//     <option value="Urgent">Urgent</option>
//     <option value="High Priority">High Priority</option>
//     <option value="Normal">Normal</option>
   
    
//   </select>
// </div>
     
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Select Employee
//         </label>
//         <select
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value)}
//           className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         >
//           <option value="" disabled>
//             Select an employee
//           </option>
//           {employees.map((employee) => (
//             <option key={employee.emp_id} value={employee.emp_id}>
//               {employee.emp_name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="flex justify-end mt-4">
//   <button
//     type="submit"
//     className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg mr-5"
//   >
//     Submit Incident
//   </button>
//   <button
//     type="button"
//     onClick={handleSendEmail}
//     className="py-2 px-4 bg-green-600 text-white rounded-md shadow-lg"
//   >
//     Save and Send Email
//   </button>
// </div>
      
//     </form>
  );
};

export default IncidentForm;
