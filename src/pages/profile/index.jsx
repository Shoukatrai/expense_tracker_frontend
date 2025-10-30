import React, { useEffect, useRef, useState } from "react";
import DashLayout from "../../components/layout/DashLayout";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { IoMdDownload } from "react-icons/io";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";
const Profile = () => {
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleClick = () => {
    console.log("function hit");
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    console.log("file", event.target.files[0]);
    setImage(event.target.files[0]);
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.uploadPofileImage}`;
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toastAlert({
        type: "success",
        message: "Prfile Image Successfully",
      });
      console.log("resposne", response.data.iamgeUrl);
      setRefresh(!refresh);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.getUser}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("resposne", response.data);
      Cookies.set("image", response.data.data.profileImageUrl);
      setUser(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [refresh]);
  return (
    <DashLayout>
      <Stack
        boxShadow={1}
        borderRadius={3}
        p={3}
        alignItems="center"
        spacing={2}
        sx={{
          width: { xs: "90%", md: "80%", },
          mx: "auto",
        }}
        position={"relative"}
      >
        <Typography variant="h5" fontWeight={700}>
          {user?.fullName} PROFILE
        </Typography>
        <Box textAlign="center">
          <Typography variant="body1" fontWeight={600} textAlign={"center"}>
            {user?.fullName || "User Name"}
          </Typography>
        </Box>
        <Box
          component="img"
          src={user?.profileImageUrl || "/src/assets/fall back image.png"}
          alt="Profile Image"
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #1976d2",
            boxShadow: 3,
          }}
        />

        <Button
          color="primary"
          aria-label="Download profile"
          onClick={handleClick}
        >
          <IoMdDownload size={24} /> Upload
        </Button>
        {image && (
          <Typography color="green">
            {image?.name || "File Selected"}
          </Typography>
        )}
        <TextField
          inputRef={inputRef}
          sx={{
            display: "none",
          }}
          type="file"
          onChange={handleImageChange}
        />
      </Stack>
    </DashLayout>
  );
};

export default Profile;
