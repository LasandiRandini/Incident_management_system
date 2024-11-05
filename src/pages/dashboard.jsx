import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const [crucialIncidents, setCrucialIncidents] = useState([]);
  const [incidentPriorityStats, setIncidentPriorityStats] = useState({});
  const [incidentStatusStats, setIncidentStatusStats] = useState({});
  const [departmentStats, setDepartmentStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/incidents/crucial")
      .then((response) => {
        setCrucialIncidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching crucial incidents:", error);
      });

    axios
      .get("http://localhost:8080/api/incidents/priority-summary")
      .then((response) => {
        setIncidentPriorityStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incident priority stats:", error);
      });

    axios
      .get("http://localhost:8080/api/incidents/summary/status")
      .then((response) => {
        setIncidentStatusStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incident status stats:", error);
      });

    axios
      .get("http://localhost:8080/api/incidents/department-summary")
      .then((response) => {
        setDepartmentStats(response.data); // Set department data
      })
      .catch((error) => {
        console.error("Error fetching department stats:", error);
      });
  }, []);

  const pieData = Object.keys(departmentStats).map((department) => ({
    name: department,
    value: departmentStats[department],
  }));

  return (
    <div className="p-6 bg-customColor ">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1>
          <b>Dashboard</b>
        </h1>
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg ">
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Crucial Incidents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crucialIncidents.map((incident) => (
              <IncidentCard
                key={incident.ins_id}
                title={incident.title}
                type={incident.type}
                date={new Date(incident.feedbackDate).toLocaleDateString()}
              />
            ))}
          </div>
        </div> */}
<div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Crucial Incidents</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {crucialIncidents.map((incident) => (
      <div
        key={incident.ins_id}
        className="bg-blue-100 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
            {incident.type}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(incident.feedbackDate).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {incident.title}
        </h3>
       
      </div>
    ))}
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div className="grid grid-cols-1 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Incidents by Priority
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {Object.keys(incidentPriorityStats).map((priority) => (
                  <div
                    key={priority}
                    className="flex flex-col items-center bg-yellow-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    <p className="text-4xl font-bold text-yellow-600 mb-2">
                      {incidentPriorityStats[priority]}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      {priority}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Incidents by Status
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {Object.keys(incidentStatusStats).map((status) => (
                  <div
                    key={status}
                    className="flex flex-col items-center bg-green-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {incidentStatusStats[status]}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      {status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="p-4 bg-red-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                Incidents by Department
              </h3>
              <PieChart width={620} height={620}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={200}
                  fill="#82ca9d"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRandomColor()} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Dashboard;
