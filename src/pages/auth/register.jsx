import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/auth/register";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string().min(6).required("Password is required"),
  });
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 2) {
        setError("File size exceeds 2MB. Please upload a smaller file.");
        setSelectedFile(null);
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width !== 400 || img.height !== 400) {
          setError(
            "Invalid image dimensions. Please upload an image of 600 x 600 pixels."
          );
          setSelectedFile(null);
        } else {
          setError("");
          setSelectedFile(file);
        }
      };
      img.onerror = () => {
        setError("Invalid image file. Please upload a valid image.");
        setSelectedFile(null);
      };
      img.src = URL.createObjectURL(file);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        display: isMobile ? "block" : "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography variant="h5" align="center" mb={2}>
        Register
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (selectedFile) {
            const formData = new FormData();
            formData.append("profilePicture", selectedFile);
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("password", values.password);

            try {
              const response = await registerUser(formData);
              if (response?.data?.success) {
                toast.success(response.data.message);
                          navigate("/auth/login");
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
              console.error("Registration error:", error);
              toast.error("Registration failed. Please try again.");
            }
          } else {
            toast.error("Please select a valid profile picture.");
          }
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                as={TextField}
                label="First Name"
                fullWidth
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="firstName"
                component="div"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                as={TextField}
                label="Last Name"
                fullWidth
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="lastName"
                component="div"
              />
            </Grid>
            <Grid item xs={12}>
              <Field name="email" as={TextField} label="Email" fullWidth />
              <ErrorMessage
                style={{ color: "red" }}
                name="email"
                component="div"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="phoneNumber"
                as={TextField}
                label="Phone Number"
                fullWidth
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="phoneNumber"
                component="div"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                fullWidth
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="password"
                component="div"
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  textAlign: "left",
                }}
              >
                <Typography>Profile Picture</Typography>
                <input type="file" onChange={handleFileInput} />
                {/* <Button
                  variant="outlined"
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                >
                  Upload
                </Button> */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {imageUrl && (
                  <div>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      style={{ width: "200px" }}
                    />
                  </div>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
};

export default AuthRegister;
