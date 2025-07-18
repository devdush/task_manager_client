import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { loginUser } from "../../services/auth/login";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../store/action/auth";

import { useTheme } from "@mui/material/styles"; // Import useTheme hook
const AuthLogin = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const obj = {
            email: values.email,
            password: values.password,
          };
          dispatch(LoginUser(obj));

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                width: "500px",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.842)", // Add box shadow
                transition: "box-shadow 0.3s ease-in-out", // Smooth transition for shadow
                padding: "20px",
                margin: "20px",
                border: "1px solid white",
                [theme.breakpoints.down("sm")]: {
                  width: "60%", // Center the items on mobile
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "black", mb: 2, textAlign: "center" }}
              >
                Login
              </Typography>
              <TextField
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                fullWidth
                sx={{
                  mb: 3,
                  border: "1px solid white",
                  "& .MuiInputBase-input": {
                    color: "black", // Text color inside the input field
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "black",
                    opacity: 1, // Ensures the placeholder is fully visible
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Label color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "black", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Border color when focused
                    },
                  },
                }}
              />

              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                fullWidth
                sx={{
                  mb: 3,
                  border: "1px solid black",
                  "& .MuiInputBase-input": {
                    color: "black", // Text color inside the input field
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "black",
                    opacity: 1, // Ensures the placeholder is fully visible
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Label color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused
                    },
                  },
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Typography sx={{ color: "black" }}>
                Don't Have an Account?
                <a href="/auth/register" style={{ color: "blue" }}>
                  {" "}
                  Register
                </a>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthLogin;
