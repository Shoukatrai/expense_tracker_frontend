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
  boxShadow: 8,
  p: { xs: 3, sm: 4 },
  outline: "none",
};
export const IncomeModal = ({ open, setOpen, isRefresh, setIsRefresh }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => setOpen(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: "",
      amount: "",
      date: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const apiUrl = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.addIncome
      }`;
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      toastAlert({
        type: "success",
        message: response.data.message || "Income added successfully",
      });

      reset();
      setOpen(false);
      setIsRefresh(!isRefresh);
    } catch (err) {
      toastAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to add income",
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
              Add Income
            </Typography>

            <Controller
              control={control}
              name="amount"
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Enter a valid amount (e.g. 100 or 150.75)",
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
              control={control}
              name="source"
              rules={{
                required: "Source is required",
                minLength: {
                  value: 5,
                  message: "Source must be at least 5 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Source"
                  fullWidth
                  error={!!errors.source}
                  helperText={errors.source?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="date"
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
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Add Income"
              )}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
