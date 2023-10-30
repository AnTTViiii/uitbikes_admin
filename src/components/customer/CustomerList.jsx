import React, { useEffect } from "react";
import { ClearRounded, Visibility } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Account } from "../configs/Customer";
import { Customer } from "../configs/Customer";
import "./customerlist.css";
import { Transition } from "../configs/functions";
import { dot3digits } from "../configs/functions";
import axios from "axios";

function CustomerList() {
  const [viewPopup, setViewPopup] = useState(false);
  const openViewPopup = () => setViewPopup(true);
  const closeViewPopup = () => setViewPopup(false);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/accounts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <div className="customer-list">
      <table className="table-1 customer-list-table">
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Số điện thoại</th>
          <th>Số dư ví</th>
          <th>Thao tác</th>
        </tr>
        {data.map((item) => (
          <tr>
            <td>{item.customer.id}</td>
            <td className="img" style={{ textAlign: "-webkit-center" }}>
              <Avatar
                src={item.avatar}
                alt={item.customer.id}
                sx={{ width: "3vw", height: "3vw" }}
              />
            </td>
            <td>{item.username}</td>
            <td>{item.customer.phone}</td>
            <td>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "decimal",
                  decimal: "VND",
                }).format(item.customer.balance) + " VNĐ"}
              </p>
            </td>
            <td
              onClick={() => {
                openViewPopup();
                setCustomerInfo(item);
              }}
            >
              <Visibility />
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
        <DialogTitle>
          <h3>Chi tiết khách hàng</h3>
        </DialogTitle>
        <DialogContent>
          <ViewCustomer customer={customerInfo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewPopup}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CustomerList;

export const ViewCustomer = (props) => {
  return (
    <div className="view-customer">
      <tr style={{ textAlign: "-webkit-center" }}>
        <td colSpan={2}>
          <Avatar
            src={props.avatar}
            alt={props.customer.id}
            sx={{ width: "4vw", height: "4vw" }}
          />
        </td>
      </tr>
      <tr>
        <th>Mã khách hàng</th>
        <td>{props.customer.id}</td>
      </tr>
      <tr>
        <th>Username</th>
        <td>{props.customer.username}</td>
      </tr>
      <tr>
        <th>Tên</th>
        <td>{props.customer.name}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{props.customer.email}</td>
      </tr>
      <tr>
        <th>Số điện thoại</th>
        <td>{props.customer.phone}</td>
      </tr>
      <tr>
        <th>Giới tính</th>
        <td>{props.customer.gender}</td>
      </tr>
      <tr>
        <th>Ngày sinh</th>
        <td>{props.customer.dob}</td>
      </tr>
      <tr>
        <th>Địa chỉ</th>
        <td>{props.customer.address}</td>
      </tr>
      <tr>
        <th>Ngày đăng ký</th>
        <td>{props.customer.registerDate}</td>
      </tr>
      <tr>
        <th>Số dư ví</th>
        <td>
          {" "}
          <p>
            {new Intl.NumberFormat("vi-VN", {
              style: "decimal",
              decimal: "VND",
            }).format(props.customer.balance) + " VNĐ"}
          </p>
        </td>
      </tr>
    </div>
  );
};
