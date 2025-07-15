import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/check-auth";
import Home from "./pages/home/layout";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLayout from "./pages/admin/layout";
import EmployeeDashboard from "./pages/employee/dashboard";
import EmployeeLayout from "./pages/employee/layout";
import EmployeeTask from "./pages/employee/tasks";
import VerifyEmail from "./components/verify-email";
import CreateTask from "./pages/admin/create-task";
import ViewTask from "./pages/admin/view-task";
import CreateEmployee from "./pages/admin/create-employee";
import ViewEmployee from "./pages/admin/view-employee";
import { CheckUserAuth } from "./store/action/auth";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import Logout from "./components/logout";
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      dispatch(CheckUserAuth(token));
    } else {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  }, [dispatch]);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthLogin />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="task-create" element={<CreateTask />} />
          <Route path="view-tasks" element={<ViewTask />} />
          <Route path="emp-create" element={<CreateEmployee />} />
          <Route path="view-emp" element={<ViewEmployee />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route
          path="/employee"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <EmployeeLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="tasks" element={<EmployeeTask />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
