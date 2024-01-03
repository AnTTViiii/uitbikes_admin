import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../customer/customerlist.css";
import { Transition } from "../configs/functions";
import { useSelector } from "react-redux";

function AdminList() {
  const [data, setData] = useState([]);
  const [viewPopup, setViewPopup] = useState(false);
  const openViewPopup = () => setViewPopup(true);
  const closeViewPopup = () => setViewPopup(false);
  const [username, setUserName] = useState("");
  const admin = useSelector((state) => state.auth.admin);
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/accounts/admin")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);
  const handleDeleteAdminRole = () => {
    axios
      .put("http://localhost:9090/api/accounts/" + username + "/isAdmin/false")
      .then((response) => {
        closeViewPopup();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="customer-list">
      <table className="table-1 customer-list-table">
        <tr>
          <th>Avatar</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Thao tác</th>
        </tr>
        {data && data.map((item) => (
          <tr>
            <td className="img" style={{ textAlign: "-webkit-center" }}>
              <Avatar
                src={item.avatar}
                alt={item.username}
                sx={{ width: "3vw", height: "3vw" }}
              />
            </td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.customer.phone}</td>

            <td>
              <Button
                className={item.username === admin.username ? "del-btn disabled" : "del-btn"}
                onClick={() => {
                  openViewPopup();
                  setUserName(item.username);
                }}
                sx={
                  item.username === admin.username
                    ? { textTransform: "none" }
                    : {}
                }
                disabled={item.username === admin.username ? true : false}
              >
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </table>
      <Dialog
        open={viewPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeViewPopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa quyền admin của tài khoản này?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewPopup}>Không</Button>
          <Button onClick={handleDeleteAdminRole}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminList;
