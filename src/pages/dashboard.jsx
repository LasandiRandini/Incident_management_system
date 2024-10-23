import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [crucialIncidents, setCrucialIncidents] = useState([]);
  const [incidentPriorityStats, setIncidentPriorityStats] = useState({});
  const [incidentStatusStats, setIncidentStatusStats] = useState({});

  useEffect(() => {
    // Fetch crucial incidents
    axios
      .get("http://localhost:8080/api/incidents/crucial")
      .then((response) => {
        setCrucialIncidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching crucial incidents:", error);
      });

    // Fetch incident priority stats
    axios
      .get("http://localhost:8080/api/incidents/priority-summary")
      .then((response) => {
        setIncidentPriorityStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incident priority stats:", error);
      });

    // Fetch incident status stats
    axios
      .get("http://localhost:8080/api/incidents/summary/status")
      .then((response) => {
        setIncidentStatusStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incident status stats:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-customColor h-screen">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1>
          <b>Dashboard</b>
        </h1>
      </div>

      {/* Crucial Incidents Section */}
      <div className="p-4 w-full bg-white rounded-lg shadow-lg mb-10">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Crucial Incidents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crucialIncidents.map((incident) => (
              <IncidentCard
                key={incident.ins_id}
                title={incident.title}
                type={incident.type}
                date={new Date(incident.feedbackDate).toLocaleDateString()}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Incident Priority Stats */}
          <div className="bg-green-200 p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-xl font-bold mb-4">Incidents by Priority</h3>
            {Object.keys(incidentPriorityStats).map((priority) => (
              <div key={priority}>
                <p className="text-gray-900 font-bold">{priority}: {incidentPriorityStats[priority]}</p>
              </div>
            ))}
          </div>

          {/* Incident Status Stats */}
          <div className="bg-green-200 p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-xl font-bold mb-4">Incidents by Status</h3>
            {Object.keys(incidentStatusStats).map((status) => (
              <div key={status}>
                <p className="text-gray-900 font-bold">{status}: {incidentStatusStats[status]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Incident Card Component
const IncidentCard = ({ title, type, date }) => {
  const typeStyles = {
    Crusial: "bg-blue-200 text-center text-bold text-black",
  };

  return (
    <div className={`p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${typeStyles[type]}`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-sm mb-3">{date}</p>
      <div className="mt-4">
        <span className="bg-white text-sm font-semibold px-4 py-2 rounded-md text-gray-800">
          {type}
        </span>
      </div>
    </div>
  );
};

// Optional chart implementation for future use
// import { Pie } from "react-chartjs-2";
// const DepartmentPieChart = ({ data }) => {
//   const chartData = {
//     labels: Object.keys(data),
//     datasets: [
//       {
//         data: Object.values(data),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   return <Pie data={chartData} />;
// };

export default Dashboard;
