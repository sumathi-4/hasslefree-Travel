import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";

import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>

            <AdminDashboard />

          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;