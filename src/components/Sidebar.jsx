import React from "react";
import "../styles/Sidebar.css";
import { Stack } from "@chakra-ui/react";
import Create from "./Create";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p className="sidebar__heading">Share your moments with your friends !</p>
      <Stack spacing={4} direction="row" align="center" marginTop={10}>
        <Create/>
      </Stack>
    </div>
  );
};

export default Sidebar;
