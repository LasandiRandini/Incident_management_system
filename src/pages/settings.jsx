import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [departments, setDepartments] = useState([]);
   const [employees, setEmployees] = useState([]);
  const [departmentForm, setDepartmentForm] = useState({ dep_name: "" });
  const [employeeForm, setEmployeeForm] = useState({
    emp_name: "",
    emp_tel_no: "",
    emp_email: "",
    dep_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get(
        "http://localhost:8080/api/departments/all"
      );
      setDepartments(Array.isArray(result.data) ? result.data : []);
    } catch  {
      setError("Unable to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  
  const fetchEmployees = async () => {
    try {
      setError(null);
      const result = await axios.get('http://localhost:8080/api/employees/all');
      setEmployees(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error fetching employees:', error);  // Log the error details
      setError('Unable to fetch employees');
    }
};
  const addDepartment = async () => {
    try {
      setError(null);
      await axios.post(
        "http://localhost:8080/api/departments/add",
        departmentForm
      );
      fetchDepartments();
      setDepartmentForm({ dep_name: "" });
    } catch  {
      setError("Failed to add department");
    }
  };

  const updateDepartment = async () => {
    try {
      setError(null);
      await axios.put(
        `http://localhost:8080/api/departments/update/${editDepartmentId}`,
        departmentForm
      );
      fetchDepartments();
      setDepartmentForm({ dep_name: "" });
      setEditDepartmentId(null);
    } catch  {
      setError("Failed to update department");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:8080/api/departments/delete/${id}`);
      fetchDepartments();
    } catch {
      setError("Failed to delete department");
    }
  };

 
  const addEmployee = async () => {
    try {
        setError(null);
        
        
        const employeePayload = {
            emp_name: employeeForm.emp_name,
            emp_tel_no: employeeForm.emp_tel_no,
            emp_email: employeeForm.emp_email,
            department: { dep_id: employeeForm.dep_id } 
        };

        await axios.post('http://localhost:8080/api/employees/add', employeePayload);
        fetchEmployees();
        setEmployeeForm({ emp_name: '', emp_tel_no: '', emp_email: '', dep_id: '' });
    } catch  {
        setError('Failed to add employee');
    }
};
  const updateEmployee = async () => {
    try {
      setError(null);
      await axios.put(`http://localhost:8080/api/employees/update/${editEmployeeId}`, employeeForm);
      fetchEmployees();
      setEmployeeForm({ emp_name: '', emp_tel_no: '', emp_email: '', dep_id: '' });
      setEditEmployeeId(null);
    } catch {
      setError('Failed to update employee');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:8080/api/employees/delete/${id}`);
      fetchEmployees();
    } catch  {
      setError('Failed to delete employee');
    }
  };

  return (
    <div className="container p-6 h-screen w-full bg-customColor rounded-lg shadow-lg mx-auto ">
      <div className="p-4 w-full bg-white rounded-lg shadow-lg">
      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Department Management */}
      <div className="mb-8">
        
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Department Management
        </h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className="border rounded p-2 flex-grow"
            value={departmentForm.dep_name}
            onChange={(e) =>
              setDepartmentForm({ ...departmentForm, dep_name: e.target.value })
            }
            placeholder="Department Name"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={editDepartmentId ? updateDepartment : addDepartment}
            disabled={!departmentForm.dep_name}
          >
            {editDepartmentId ? "Update Department" : "Add Department"}
          </button>
        </div>

        {loading ? (
          <p>Loading departments...</p>
        ) : departments.length > 0 ? (
          <ul className="mt-4 grid grid-cols-1 gap-4">
            {departments.map((dep) => (
              <li
                key={dep.dep_id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between"
              >
                <span>{dep.dep_name}</span>
                <div>
                  <button
                    className="text-yellow-500 border border-yellow-500  rounded px-2 py-1 hover:bg-yellow-500 hover:text-white transition  mr-2 "
                    onClick={() => {
                      setDepartmentForm({ dep_name: dep.dep_name });
                      setEditDepartmentId(dep.dep_id);
                    }}
                  >
                    Edit
                  </button>
                  {/* <button
                    className=" text-red px-2 py-1 border-red-500 rounded"
                    onClick={() => deleteDepartment(dep.dep_id)}
                  >
                    Delete
                  </button> */}
                  <button
  className="text-red-500 border border-red-500  rounded px-2 py-1 hover:bg-red-500 hover:text-white transition"
  onClick={() => deleteDepartment(dep.dep_id)}
>
  Delete
</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No departments found</p>
        )}
      </div>
      {/* Employee Management */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Employee Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            className="border rounded p-2"
            value={employeeForm.emp_name}
            onChange={(e) =>
              setEmployeeForm({ ...employeeForm, emp_name: e.target.value })
            }
            placeholder="Employee Name"
          />
          <input
            type="text"
            className="border rounded p-2"
            value={employeeForm.emp_tel_no}
            onChange={(e) =>
              setEmployeeForm({ ...employeeForm, emp_tel_no: e.target.value })
            }
            placeholder="Employee Phone"
          />
          <input
            type="text"
            className="border rounded p-2"
            value={employeeForm.emp_email}
            onChange={(e) =>
              setEmployeeForm({ ...employeeForm, emp_email: e.target.value })
            }
            placeholder="Employee Email"
          />
          <select
            className="border rounded p-2"
            value={employeeForm.dep_id}
            onChange={(e) =>
              setEmployeeForm({ ...employeeForm, dep_id: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep.dep_id} value={dep.dep_id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={editEmployeeId ? updateEmployee : addEmployee}
          disabled={!employeeForm.emp_name || !employeeForm.dep_id}
        >
          {editEmployeeId ? "Update Employee" : "Add Employee"}
        </button>

        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length > 0 ? (
          <ul className="mt-4 grid grid-cols-1 gap-4">
            {employees.map((emp) => (
              <li
                key={emp.emp_id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between"
              >
                <span>
                  <strong>Name:</strong> {emp.emp_name} <br />
                  <strong>Email:</strong> {emp.emp_email} <br />
                  <strong>Phone:</strong> {emp.emp_tel_no} <br />
                  <strong>Department:</strong> {emp.department?.dep_name}
                </span>
                <div>
                  <button
                    className="text-yellow-500 border border-yellow-500  rounded px-2 py-1 hover:bg-yellow-500 hover:text-white transition  mr-2"
                    onClick={() => {
                      setEmployeeForm({
                        emp_name: emp.emp_name,
                        emp_tel_no: emp.emp_tel_no,
                        emp_email: emp.emp_email,
                        dep_id: emp.department?.dep_id,
                      });
                      setEditEmployeeId(emp.emp_id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 border border-red-500  rounded px-2 py-1 hover:bg-red-500 hover:text-white transition"
                      onClick={() => deleteEmployee(emp.emp_id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
