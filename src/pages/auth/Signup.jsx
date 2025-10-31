import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const api = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.registerUser
      }`;
      const response = await axios.post(api, data);

      if (!response.data.status) {
        toastAlert({
          type: "error",
          message: response.data.message || "Signup error",
        });
        setLoading(false);
        return;
      }

      toastAlert({
        type: "success",
        message: response.data.message || "Signup Success",
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toastAlert({
        type: "error",
        message:
          error.response?.data?.message || error.message || "Signup error",
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 380,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" mb={3} fontWeight={700} color="primary">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: emailPattern,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 character",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <Box>
            <Typography variant="body2" mt={1}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Signup;
