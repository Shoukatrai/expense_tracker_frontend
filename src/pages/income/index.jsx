import React, { useEffect, useState } from "react";
import DashLayout from "../../components/layout/DashLayout";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { IncomeModal } from "../../components/modals/IncomeModal";
import { toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdDownload } from "react-icons/io";
import { MdRemoveRoad } from "react-icons/md";
const Income = () => {
  const [open, setOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [reafreshData, setRefreshData] = useState([]);
  const fetchData = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.getIncome
      }`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setData(response.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const incomeDeleteHanler = async (id) => {
    try {
      console.log("id", id);
      const apiUrl = `${
        import.meta.env.VITE_BASE_URL
      }${apiEndPoints.deleteIncome(id)}`;
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("response", response);
      toastAlert({
        type: "success",
        message: "Income Deleted Successfully",
      });
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log("responseerror", error);
      toastAlert({
        type: "error",
        message: error.message || "Income Deleting Error",
      });
    }
  };
  const handleDowload = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.downloadIncome
      }`;
      const response = await axios.get(apiUrl, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "expense-report.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
      console.log(response.data?.sheet);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = async (date) => {
    try {
      console.log("date", date);
      const apiUrl = `${
        import.meta.env.VITE_BASE_URL
      }${apiEndPoints.refreshIncome(date)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setRefreshData(response.data?.data || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (reafreshData.length > 0) {
      setData(reafreshData);
    } else {
      fetchData();
    }
  }, [isRefresh, reafreshData]);
  return (
    <DashLayout pageTitle={"Income"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}>
          Income
        </Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Income
        </Button>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"} marginTop={5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            sx={{
              marginTop: "20px",
            }}
            onClick={() => fetchData()}
          >
            <MdRemoveRoad />
          </Button>
          <TextField
            label="Filter by Date"
            variant="standard"
            type="date"
            onChange={(e) => handleRefresh(e.target.value)}
          ></TextField>
        </Box>
        <Button
          variant="outlined"
          onClick={handleDowload}
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          <IoMdDownload size={18} /> Income sheet
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 1, mt: 3 }}>
        <Table
          sx={{
            minWidth: 650,
            "& th": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 700,
              fontSize: { xs: 14, sm: 16 },
              borderBottom: "2px solid #e0e0e0",
              letterSpacing: 1,
              textAlign: "center",
            },
            "& td": {
              fontSize: { xs: 13, sm: 15 },
              py: 1.5,
              textAlign: "center",
            },
          }}
          aria-label="orders table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Income</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((income) => {
              return (
                <TableRow
                  key={income._id}
                  sx={{
                    bgcolor: "background.default",
                  }}
                >
                  <TableCell>{income?.amount}</TableCell>
                  <TableCell>{income?.amount}</TableCell>
                  <TableCell>{income?.source}</TableCell>
                  <TableCell>
                    {new Date(income?.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    <MdOutlineDelete
                      size={22}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => incomeDeleteHanler(income?._id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <IncomeModal
        open={open}
        setOpen={setOpen}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />
    </DashLayout>
  );
};

export default Income;
