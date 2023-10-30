import React from "react";
import "./tovnav.css";
import UserInfo from "../user-info/UserInfo";
import data from "../configs/data";
import { MenuRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";

const TopNav = () => {
  const openSideBar = () => {
    document.body.classList.add("sidebar-open");
  };
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="topnav">
      <UserInfo user={user} />
      <div className="sidebar-toggle" onClick={openSideBar}>
        <MenuRounded className="icon" />
      </div>
    </div>
  );
};

export default TopNav;
