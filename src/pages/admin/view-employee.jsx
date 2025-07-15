import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getUsers from "../../services/users/getUsers"; // Adjust path if needed

const ViewEmployee = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phoneNumber", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "verified",
      headerName: "Verified",
      flex: 1,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getUsers(); // Make sure this returns an array of employees
        if (response.success) {
          setEmployees(response.data);
        } else {
          toast.error("Failed to load employees");
        }
      } catch (err) {
        toast.error("Error fetching employees");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box
      sx={{
        height: "78vh",
        width: "100%",
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.default,
        },
        "& .MuiDataGrid-cell": {
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
      />
    </Box>
  );
};

export default ViewEmployee;
