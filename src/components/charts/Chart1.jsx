import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Chart1({ totalAmount, totalIncome, totalExpense }) {
  const props = {
    width: 400,
    height: 300,
  };

  const dataObj = {
    totalAmount: Number(totalAmount),
    totalIncome: Number(totalIncome),
    totalExpense: Number(totalExpense),
  };
  console.log("data obj", dataObj);

  const data = [
    { id: 0, value: dataObj.totalAmount, label: "Total Balance" },
    { id: 1, value: dataObj.totalIncome, label: "Total Income" },
    { id: 2, value: dataObj.totalExpense, label: "Total Expense" },
  ];

  return (
    <PieChart
      {...props}
      series={[
        {
          data,
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 10,
          innerRadius: 30,
          outerRadius: 120,
          paddingAngle: 2,
        },
      ]}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 0,
        },
      }}
    />
  );
}
