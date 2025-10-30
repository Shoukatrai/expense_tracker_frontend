import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { TrendingUp, PieChart, Wallet, BarChart } from "@mui/icons-material";

const features = [
  {
    icon: <Wallet sx={{ fontSize: 40, color: "#3b82f6" }} />,
    title: "Track Every Expense",
    description:
      "Easily log daily transactions and stay aware of where your money goes.",
  },
  {
    icon: <PieChart sx={{ fontSize: 40, color: "#818cf8" }} />,
    title: "Visual Insights",
    description:
      "Get clear visuals through charts and graphs to analyze spending habits.",
  },
  {
    icon: <BarChart sx={{ fontSize: 40, color: "#06b6d4" }} />,
    title: "Smart Budgeting",
    description:
      "Set limits and receive insights to help you save and manage efficiently.",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: "#10b981" }} />,
    title: "Financial Growth",
    description:
      "Measure your progress and take steps toward achieving your financial goals.",
  },
];

const Feature = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 10 },
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 3,
          background: "linear-gradient(90deg, #3b82f6, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Powerful Features for Smarter Finances
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "text.secondary",
          mb: 8,
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        Everything you need to track, analyze, and grow your financial health —
        beautifully integrated into one app.
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feature;
