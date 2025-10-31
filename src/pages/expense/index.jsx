import DashLayout from "../../components/layout/DashLayout";
import {
  Box,
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
  TextField,
} from "@mui/material";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";
import { ExpenseModal } from "../../components/modals/ExpenseModal";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdRemoveRoad } from "react-icons/md";
const Expense = () => {
  const [open, setOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [reafreshData, setRefreshData] = useState([]);
  const fetchData = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.getExpense
      }`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setRefreshData(response.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDowload = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${
        apiEndPoints.downloadExpense
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
  const expenseDeleteHanler = async (id) => {
    try {
      console.log("id", id);
      const apiUrl = `${
        import.meta.env.VITE_BASE_URL
      }${apiEndPoints.deleteExpense(id)}`;
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("response", response);
      toastAlert({
        type: "success",
        message: "Expense Deleted Successfully",
      });
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log("responseerror", error);
      toastAlert({
        type: "error",
        message: error.message || "Expense Deleting Error",
      });
    }
  };

  const handleRefresh = async (date) => {
    try {
      console.log("date", date);
      const apiUrl = `${
        import.meta.env.VITE_BASE_URL
      }${apiEndPoints.refreshExpense(date)}`;
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
    <DashLayout pageTitle={"Expenses"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}>
          Expenses
        </Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Expense
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
          <IoMdDownload size={18}/> expense sheet
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
              <TableCell>Expense</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
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
                  <TableCell>{income?.category}</TableCell>
                  <TableCell>{income?.description}</TableCell>
                  <TableCell>
                    {new Date(income?.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    <MdOutlineDelete
                      size={22}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => expenseDeleteHanler(income?._id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ExpenseModal
        open={open}
        setOpen={setOpen}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />
    </DashLayout>
  );
};

export default Expense;
