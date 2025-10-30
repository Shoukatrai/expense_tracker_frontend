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
import {  toastAlert } from "../../utils";
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
  p: { xs: 2, sm: 4 },
  border: "none",
  outline: "none",
};

export const IncomeModal = ({ open, setOpen, isRefresh, setIsRefresh }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      source: "",
      amount: "",
      date: "",
    },
  });

 

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${apiEndPoints.addIncome}`;
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("response", response);

      setLoading(false);

      toastAlert({
        type: "success",
        message: response.data.message || "Income Addedd Successfully",
      });
      reset();
      handleClose();
      setIsRefresh(!isRefresh);
    } catch (err) {
      setLoading(false);
      toastAlert({
        type: "error",
        message: err.message || "Income Adding Error",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack gap={1.5} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h4"
              align="center"
              fontWeight={700}
              color="primary"
            >
              Add Income
            </Typography>

            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="source"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Source"
                  variant="outlined"
                  fullWidth
                  required
                  type="text"
                />
              )}
            />
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date"
                  variant="outlined"
                  fullWidth
                  required
                  type="date"
                />
              )}
            />

            {/* <Button variant="outlined" component="label">
              Upload Report (PDF/Image)
              <input
                type="file"
                accept="application/pdf,image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button> */}

            {/* {reportFile && (
              <Typography variant="body2" color="text.secondary">
                Selected file: {reportFile.name}
              </Typography>
            )} */}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, color: "white" }}
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
