import React, { useEffect, useState } from "react";
import DashLayout from "../../components/layout/DashLayout";
import axios from "axios";
import { apiEndPoints } from "../../constant/apiEndPoints";
import Cookies from "js-cookie";
import { Box, Stack, Typography } from "@mui/material";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { blue } from "@mui/material/colors";
import Chart1 from "../../components/charts/Chart1";
import { BarChart } from "@mui/x-charts";
const Dashboard = () => {
  const [data, setData] = useState({});
  const fecthData = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}${apiEndPoints.getTracker}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("response", response);
      setData(response.data?.data[0] || {});
    } catch (error) {
      console.log("tracker error", error);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);
  return (
    <DashLayout>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mt: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={{ xs: "100%", sm: "30%" }}
          p={2}
          boxShadow={2}
          borderRadius={2}
          bgcolor={"white"}
          color={blue[500]}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <MdOutlinePayment size={30} color={blue[500]} />
            <Typography fontWeight={600}>Total Income:</Typography>
          </Box>
          <Typography fontWeight={700}>
            ${data?.totalIncome?.toLocaleString() || 0}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={{ xs: "100%", sm: "30%" }}
          p={2}
          boxShadow={2}
          borderRadius={2}
          bgcolor={"white"}
          color={blue[500]}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <FaMoneyBillWave size={30} color={blue[500]} />
            <Typography fontWeight={600}>Total Expense:</Typography>
          </Box>
          <Typography fontWeight={700}>
            ${data?.totalExpense?.toLocaleString() || 0}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={{ xs: "100%", sm: "30%" }}
          p={2}
          boxShadow={2}
          borderRadius={2}
          bgcolor={"white"}
          color={blue[500]}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <MdOutlineAccountBalance color={blue[500]} size={30} />
            <Typography fontWeight={600}>Total Balance:</Typography>
          </Box>
          <Typography fontWeight={700}>
            ${data?.totalAmount?.toLocaleString() || 0}
          </Typography>
        </Box>
      </Stack>

      <Stack
        sx={{
          p: { xs: 2, sm: 3 },
          mt: 3,
        }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <BarChart
          xAxis={[
            { data: ["Total Balance", "Total Income", "Total Expenses"] },
          ]}
          series={[
            {
              data: [
                Math.abs(data?.totalAmount || 0),
                data?.totalIncome || 0,
                data?.totalExpense || 0,
              ],
              label: "Finance Dispaly",
            },
          ]}
          height={300}
          sx={{
            "& .MuiChartsLegend-root": { display: "none" },
          }}
        />

        <Chart1
          totalAmount={data?.totalAmount || 0}
          totalIncome={data?.totalIncome || 0}
          totalExpense={data?.totalExpense || 0}
        />
      </Stack>
    </DashLayout>
  );
};

export default Dashboard;
