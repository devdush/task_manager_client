import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import getUsers from "../../services/users/getUsers";
import { createTask } from "../../services/tasks/createTask";
import { create } from "@mui/material/styles/createTransitions";
import { toast } from "react-toastify";

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

const CreateTask = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [userOptions, setUserOptions] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUserOptions(response.data);
    };
    fetchUsers();
  }, []);

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
      console.log("Submitted data:", values);
      try {
        const taskData = {
          title: values.title,
          description: values.description,
          startDate: values.startDate,
          endDate: values.endDate,
          priority: values.priority,
          assignedTo: values.assignedTo,
          attachments: values.attachments.split(",").map((url) => url.trim()),
          createdBy: JSON.parse(sessionStorage.getItem("user")).id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        console.log("Creating task with data:", taskData);
        const response = await createTask(taskData);
        if (response.status === 201) {
          console.log("Task created successfully:", response.data);
          toast.success("Task created successfully!");
        } else {
          console.error("Failed to create task:", response);
          toast.error("Failed to create task. Please try again.");
        }
        formik.resetForm();
      } catch (error) {
        toast.error("Failed to create task. Please try again.");
      }
    },
  });

  return (
    <Box p={2} sx={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
      <Typography variant="h6" gutterBottom>
        Create Task
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
              rows={4}
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
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
              helperText={formik.touched.startDate && formik.errors.startDate}
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
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={
                formik.touched.assignedTo && Boolean(formik.errors.assignedTo)
              }
            >
              <InputLabel id="assignedTo-label">Assigned To</InputLabel>
              <Select
                labelId="assignedTo-label"
                id="assignedTo"
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
              {formik.touched.assignedTo && formik.errors.assignedTo && (
                <Typography variant="caption" color="error">
                  {formik.errors.assignedTo}
                </Typography>
              )}
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
                <FormControlLabel value="low" control={<Radio />} label="Low" />
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
              error={
                formik.touched.attachments && Boolean(formik.errors.attachments)
              }
              helperText={
                formik.touched.attachments && formik.errors.attachments
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth={isMobile}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateTask;
