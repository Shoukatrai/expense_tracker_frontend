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
import {  toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Signup data:", data);
      const api = `${import.meta.env.VITE_BASE_URL}${apiEndPoints.registerUser}`;
      const response = await axios.post(api, data);
      console.log("response", response);
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
        message: error.message || "Signup Error!",
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 360,
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" mb={3} fontWeight={700} color="primary">
        Singup
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Full Name" type="text" fullWidth />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={Loading}
          >
            {Loading ? "Signning up..." : "Signup"}
          </Button>
          <Box>
            <Typography>Have an account!</Typography>
            <Link
              style={{
                color: "red",
              }}
              to={"/login"}
            >
              Login
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;
