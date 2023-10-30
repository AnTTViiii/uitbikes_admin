import React from "react";
import "./userinfo.css";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <div className="user-info__img">
        <img src={user.avatar} alt="" />
      </div>
      <div className="user-info__name">
        <span>{user.username}</span>
      </div>
    </div>
  );
};

export default UserInfo;
