import React from "react";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid
        container
        spacing={6}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Expense Tracker
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Take control of your finances. Track, analyze, and achieve your
            goals — all in one place.
          </Typography>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2, color: "#cbd5e1" }}
          >
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Features
            </Link>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Pricing
            </Link>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </Stack>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2, color: "#cbd5e1" }}
          >
            Resources
          </Typography>
          <Stack spacing={1}>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blog
            </Link>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Guides
            </Link>
            <Link
              to="/dashboard"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Support
            </Link>
          </Stack>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2, color: "#cbd5e1" }}
          >
            Connect with us
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link
              to="https://github.com/shoukatrai"
              href=""
              target="_blank"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <GitHub />
            </Link>
            <Link
              to="https://linkedin.com/in/shoukatrai"
              target="_blank"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <LinkedIn />
            </Link>
            <Link
              to={"https://twitter.com/shoukatrai4"}
              target="_blank"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Twitter />
            </Link>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

      <Typography
        variant="body2"
        align="center"
        sx={{ color: "rgba(255,255,255,0.6)" }}
      >
        © {new Date().getFullYear()} Expense Tracker — Built with ❤️ by Shoukat
        Rai
      </Typography>
    </Box>
  );
};

export default Footer;
