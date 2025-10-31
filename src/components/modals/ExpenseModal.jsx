import * as React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 400, md: 500 },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 10,
  p: { xs: 3, sm: 4 },
  outline: "none",
};

export const ExpenseModal = ({ open, setOpen, isRefresh, setIsRefresh }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => setOpen(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      category: "",
      description: "",
      date: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.addExpense
      }`;

      const response = await axios.post(apiUrl, data, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });

      toastAlert({
        type: "success",
        message: response.data.message || "Expense added successfully",
      });

      reset();
      setOpen(false);
      setIsRefresh(!isRefresh);
    } catch (err) {
      toastAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to add expense",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack
            gap={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Typography
              variant="h5"
              align="center"
              fontWeight={700}
              color="primary"
              mb={1}
            >
              Add Expense
            </Typography>

            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Enter a valid amount (e.g. 150 or 99.99)",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  fullWidth
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{
                required: "Category is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              rules={{
                required: "Date is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Add Expense"
              )}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
