import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getTaskForUser } from "../../services/tasks/getTaskForUser";

import { updateStatus } from "../../services/tasks/updateStatus";
import { toast } from "react-toastify";

const EmployeeTask = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      const response = await getTaskForUser(userId);
      setTasks(response.data.data || []);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    console.log("Updating status for task:", taskId, "to", newStatus);
    try {
      const response = await updateStatus(taskId, newStatus); // your API call
      if (response.data.success) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
        toast.success("Task status updated successfully");
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <Box sx={{ padding: "10px" }}>
        <Grid container spacing={2}>
          {tasks.slice(0, 9).map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={product._id || index}
              sx={{ mb: "20px" }}
            >
              <Box
                sx={{
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                    backgroundColor: "#ffffff",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    fontSize: "1.1rem",
                    mb: 1,
                  }}
                >
                  {product.title.length > 50
                    ? `${product.title.substring(0, 50)}...`
                    : product.title}
                </Typography>

                <Typography sx={{ fontWeight: 400, color: "#555", mb: 1 }}>
                  {product.description.length > 50
                    ? `${product.description.substring(0, 50)}...`
                    : product.description}
                </Typography>

                {/* Status dropdown */}
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={product.status}
                    label="Status"
                    onChange={(e) =>
                      handleStatusChange(product._id, e.target.value)
                    }
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>

                <Typography
                  sx={{
                    fontWeight: "500",
                    mb: 1,
                    color: product.priority === "high" ? "red" : "green",
                  }}
                >
                  Priority: <strong>{product.priority}</strong>
                </Typography>

                <Typography sx={{ fontWeight: "400", color: "#777", mb: 0.5 }}>
                  Start:{" "}
                  {new Date(product.startDate).toLocaleDateString("en-GB")}
                </Typography>
                <Typography sx={{ fontWeight: "400", color: "#777" }}>
                  End: {new Date(product.endDate).toLocaleDateString("en-GB")}
                </Typography>
              </Box>
            </Grid>
          ))}

          {Array.from({
            length: (4 - (tasks.length % 4)) % 4,
          }).map((_, idx) => (
            <Grid item xs={12} sm={6} md={3} key={`empty-${idx}`} />
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default EmployeeTask;
