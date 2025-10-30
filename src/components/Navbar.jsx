import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Stack>
      <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
    </Stack>
  );
};

export default Navbar;
