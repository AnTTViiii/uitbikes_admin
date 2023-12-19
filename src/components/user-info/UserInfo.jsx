import React from "react";
import "./userinfo.css";

const UserInfo = ({ admin }) => {
  return (
    <div className="user-info">
      <div className="user-info__img">
        <img src={admin.avatar} alt="" />
      </div>
      <div className="user-info__name">
        <span>{admin.username}</span>
      </div>
    </div>
  );
};

export default UserInfo;
