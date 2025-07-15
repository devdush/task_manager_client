import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  useTheme,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import { toast } from "react-toastify";
import { getTasks } from "../../services/tasks/getTask";
import { deleteTask } from "../../services/tasks/deleteTask";
import { updateTask } from "../../services/tasks/updateTask";
import getUsers from "../../services/users/getUsers";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date can't be before start date"),
  priority: Yup.string().required("Priority is required"),
  assignedTo: Yup.array().min(1, "Select at least one user"),
});

const ViewTask = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [userOptions, setUserOptions] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      if (response.data.success) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchTasks();
    getUsers().then((res) => setUserOptions(res.data));
  }, []);

  const handleDelete = async (row) => {
    try {
      const response = await deleteTask(row._id);
      if (response.data.success) {
        toast.success("Task deleted successfully");
        setData((prev) => prev.filter((item) => item._id !== row._id));
      } else {
        toast.error("Error deleting task");
      }
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handleUpdate = (row) => {
    setSelectedTask(row);
    formik.setValues({
      ...row,
      assignedTo: row.assignedTo || [],
      attachments: (row.attachments || []).join(", "),
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "medium",
      assignedTo: [],
      attachments: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedTask = {
          ...values,
          attachments: values.attachments.split(",").map((v) => v.trim()),
        };
        const response = await updateTask(selectedTask._id, updatedTask);
        if (response.data.success) {
          toast.success("Task updated successfully");
          fetchTasks();
          handleClose();
        } else {
          toast.error("Failed to update task");
        }
      } catch (error) {
        toast.error("Update error");
      }
    },
  });

  const columns = [
    { field: "title", headerName: "Title", flex: 3 },
    { field: "startDate", headerName: "Start Date", flex: 2 },
    { field: "endDate", headerName: "End Date", flex: 2 },
    { field: "priority", headerName: "Priority", flex: 1 },
    { field: "status", headerName: "Status", flex: 2 },
    {
      field: "action",
      headerName: "Actions",
      flex: 3,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            onClick={() => handleDelete(params.row)}
            variant="contained"
            color="error"
          >
            <DeleteForeverIcon />
          </Button>
          <Button
            onClick={() => handleUpdate(params.row)}
            variant="contained"
            color="info"
          >
            <UpdateIcon />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box height="100vh" sx={{ overflow: "scroll" }}>
        <DataGrid
          rows={filteredData}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: 600,
            width: "95%",
            mx: "auto",
            mt: 4,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            overflow: "scroll",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Task
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  name="endDate"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Grid>
                  
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="assignedTo-label">Assigned To</InputLabel>
                  <Select
                    labelId="assignedTo-label"
                    multiple
                    name="assignedTo"
                    value={formik.values.assignedTo}
                    onChange={formik.handleChange}
                    input={<OutlinedInput label="Assigned To" />}
                    renderValue={(selected) =>
                      userOptions
                        .filter((user) => selected.includes(user._id))
                        .map((user) => user.firstName + " " + user.lastName)
                        .join(", ")
                    }
                  >
                    {userOptions.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        <Checkbox
                          checked={formik.values.assignedTo.includes(user._id)}
                        />
                        <ListItemText
                          primary={user.firstName + " " + user.lastName}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Priority</FormLabel>
                  <RadioGroup
                    row={!isMobile}
                    name="priority"
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="low"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="medium"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="high"
                      control={<Radio />}
                      label="High"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="attachments"
                  label="Attachments (comma separated URLs)"
                  value={formik.values.attachments}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth={isMobile}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ViewTask;
