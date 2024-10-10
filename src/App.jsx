// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// import Dashboardpage from "./pages/dashboard";
// import Sidebar from "./components/sidebar";
// import Navbar from "./components/navbar";
// import Incidentmain from "./pages/incident_main";
// import Report from "./pages/report";
// import Login from "./pages/login";
// import Registration from "./pages/registration";

// const AdminLayout = () => {
//   const navbarHeight = "60px"; 
//   const [isSidebarVisible, setSidebarVisible] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const toggleSidebar = () => {
//     setSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
      
//         backgroundColor: "#f3f3f3",
//       }}
//     >
//       <div style={{ height: navbarHeight }}>
//         <Navbar
//           toggleSidebar={toggleSidebar}
//           isSidebarVisible={isSidebarVisible}
//         />
//       </div>
//       <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
//         {isSidebarVisible && (
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <Sidebar 
            
//             selectedIndex={selectedIndex}
//             setSelectedIndex={setSelectedIndex}
//             />
//           </div>
//         )}
//         <div style={{ flex: 1, overflowY: "auto" }}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// const router = createBrowserRouter([
//   {
// path: "/login",
// element: <Login />,
//   },
//   {
//     path: "/registration",
//     element: <Registration />,
//       },
//   {
//     path: "/",
//     element: <AdminLayout />,
//     children: [
      
//       { path: "/", element: <Dashboardpage />, },
//       { path: "/incidentmain", element: <Incidentmain />, },
//       { path: "/report", element: <Report />, },
//     ],
//   },


// ]);



// const App = () => {
//   return (
   

//       <RouterProvider router={router} />

  
//   );
// };

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Dashboardpage from "./pages/dashboard";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Incidentmain from "./pages/incident_main";
import Report from "./pages/report";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Add_incident from "./pages/add_incident";
import Update_incident from "./pages/update_incident";
import Customer_login from "./Customer_pages/customer_login";
import Progress from "./Customer_pages/progress_page";

const AdminLayout = () => {
  const navbarHeight = "60px"; 
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div style={{ height: navbarHeight }}>
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {isSidebarVisible && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Sidebar 
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        )}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/customer_login",
    element: <Customer_login />,
  }, 
  {
    path: "/progress",
    element: <Progress />,
  },
  {
    path: "/",
    element: <AdminLayout />, // Admin layout only applies to authenticated pages
    children: [
      { path: "/dashboard", element: <Dashboardpage /> },
      { path: "/incidentmain", element: <Incidentmain /> },
      { path: "/report", element: <Report /> },
      { path: "/add_incident", element: <Add_incident /> },
      { path: "/update_incident", element: <Update_incident /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
