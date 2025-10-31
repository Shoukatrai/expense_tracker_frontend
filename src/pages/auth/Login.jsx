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
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Login data:", data);

      const api = `${import.meta.env.VITE_BASE_URL}${apiEndPoints.login}`;
      const response = await axios.post(api, data);

      if (!response.data.status) {
        setLoading(false);
        return toastAlert({
          type: "error",
          message: response.data.message || "Invalid email or password",
        });
      }

      toastAlert({
        type: "success",
        message: "Login Successful!",
      });

      Cookies.set("token", response.data.token);
      Cookies.set("name", response.data.data.fullName);
      Cookies.set("image", response.data?.data?.profileImageUrl || "");

      navigate("/dashboard");
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 360,
        mx: "auto",
        mt: 10,
        p: 4,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" mb={3} fontWeight={700} color="primary">
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
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
                message: "Password must be at least 8 characters long",
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
            disabled={ loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Box mt={1}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;
