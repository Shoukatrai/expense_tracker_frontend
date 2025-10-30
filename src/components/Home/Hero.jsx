import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/Generated Image October 30, 2025 - 4_57PM.png";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        minHeight: "90vh",
        px: { xs: 2, md: 10 },
        py: { xs: 8, md: 0 },
        background: "white",
        color: "white",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "45%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.2,
            background: "linear-gradient(90deg, #081e27ff, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Expense Tracker
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: " #6864b3ff ",
          }}
        >
          Take control of your finances — track, analyze, and save smarter.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
            borderRadius: "9999px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0 2px 1px rgba(99,102,241,0.4)",
            "&:hover": {
              background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Box>

      <Box
        component="img"
        src={heroImg}
        alt="Expense Tracking Illustration"
        sx={{
          width: { xs: "100%", md: "45%" },
          mt: { xs: 5, md: 0 },
          borderRadius: 4,
        }}
      />
    </Stack>
  );
};

export default Hero;
