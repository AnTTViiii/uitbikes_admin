import React from "react";
import "./tovnav.css";
import UserInfo from "../user-info/UserInfo";
import { MenuRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";

const TopNav = () => {
  const openSideBar = () => {
    document.body.classList.add("sidebar-open");
  };
  const admin = useSelector((state) => state.auth.admin);
  return (
    <div className="topnav">
      <UserInfo admin={admin} />
      <div className="sidebar-toggle" onClick={openSideBar}>
        <MenuRounded className="icon" />
      </div>
    </div>
  );
};

export default TopNav;
