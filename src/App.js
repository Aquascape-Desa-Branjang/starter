import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Monitoring from "./pages/monitoring";
import Plts from "./pages/plts";
import SensorParameter from "./pages/sensor&parameter";
import AddSensorParameter from "./pages/sensor&parameteradd"; // Import AddSensorParameter
import EditSensorParameter from "./pages/sensor&parameteredit"; // Import EditSensorParameter
import UserAdmin from "./pages/user&admin";
import AddUserAdmin from "./pages/user&adminadd";
import EditUserAdmin from "./pages/user&adminedit";
import RolesPermission from "./pages/roles&permission";
import AddRolesPermission from "./pages/roles&permissionadd";
import EditRolesPermission from "./pages/roles&permissionedit";
import Navbar from "./component/navbar";

function App() {
  const location = useLocation();

  const showNavbar = !["/", "/register"].includes(location.pathname);

  return (
    <div className="flex">
      {showNavbar && <Navbar />}

      <div className="main-content flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/plts" element={<Plts />} />
          <Route path="/sensor&parameter" element={<SensorParameter />} />
          <Route path="/sensor&parameteradd" element={<AddSensorParameter />} /> 
          <Route path="/sensor&parameteredit/:id" element={<EditSensorParameter />} /> {/* Tambahkan :id */}
          <Route path="/user&admin" element={<UserAdmin />} />
          <Route path="/user&adminadd" element={<AddUserAdmin />} /> 
          <Route path="/user&adminedit/:id" element={<EditUserAdmin />} /> {/* Tambahkan :id */}
          <Route path="/roles&permission" element={<RolesPermission />} />
          <Route path="/roles&permissionadd" element={<AddRolesPermission />} /> 
          <Route path="roles&permissionedit:id" element={<EditRolesPermission />} /> {/* Tambahkan :id */}
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
