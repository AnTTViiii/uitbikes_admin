import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Transition,
  dot3digits,
  getGender,
  requestStatus,
  getChargeRequestStatusName,
  getChargeRequestStatusNotify,
} from "../configs/functions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import "./request-list.css";

function RequestList() {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9090/api/requests`).then((response) => {
      setRequest(response.data.reverse());
    })
    .catch((err) => {console.log(err)});
  }, [request]);
  
  async function updateStatus(e, id) {
    e.preventDefault();
    console.log(e.target.value);
    try {
      await axios.put(
        `http://localhost:9090/api/requests/${id}/status/${e.target.value}`
      );
      alert(
        "Yêu cầu nạp tiền #" +
          id +
          " " +
          getChargeRequestStatusNotify(e.target.value) +
          "."
      );
    } catch (error) {
      alert(error);
    }
  }
  const [customerInfoPopup, setCustomerInfoPopup] = useState(false);
  const [customerInfo, setCustomerInfo] = useState([]);
  const openCustomerInfoPopup = () => setCustomerInfoPopup(true);
  const closeCutomerInfoPopup = () => setCustomerInfoPopup(false);

  return (
    <div className="request-list">
      <table className="table-1 request-list-table">
        <tr>
          <th>Mã nạp tiền</th>
          <th>Mã khách hàng</th>
          <th>Tên khách hàng</th>
          <th>Số tiền</th>
          <th>Ngày nạp</th>
          <th>Số tài khoản</th>
          <th>Trạng thái</th>
        </tr>
        {request && request.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>
              <p
                onClick={() => {
                  openCustomerInfoPopup();
                  setCustomerInfo(item.customer);
                }}
              >
                Mã #{item.customer.id}
              </p>
            </td>
            <td>
              <p
                onClick={() => {
                  openCustomerInfoPopup();
                  setCustomerInfo(item.customer);
                }}
              >
                {item.customer.name}
              </p>
            </td>
            <td>{dot3digits(item.money)} đ</td>
            <td>{new Date(item.date).toLocaleString()}</td>
            <td>
              <p>{item.accountNumber}</p>
            </td>
            <td>
              <Select
                className="select-box"
                defaultValue={item.status}
                size="small"
                onChange={(e) => updateStatus(e, item.id)}
              >
                {requestStatus.map((status, index) => (
                  <MenuItem
                    disabled={
                      index < item.status ||
                      (item.status === 1 && index === 1) ||
                      item.status === 1
                    }
                    value={index}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </td>
          </tr>
        ))}
      </table>

      <Dialog
        open={customerInfoPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeCutomerInfoPopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <h2>Thông tin khách hàng</h2>
        </DialogTitle>
        <DialogContent>
          <CustomerInfo info={customerInfo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCutomerInfoPopup}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RequestList;

export const CustomerInfo = ({ info }) => {
  return (
    <div className="customer-info">
      <p>
        <span>
          <b>Tên KH:</b> {info.name}
        </span>
        <span>
          <b>Giới tính:</b> {getGender(info.gender)}
        </span>
      </p>
      <p>
        <b>CCCD/CMT:</b> <span>{info.idNumber}</span>
      </p>
      <p>
        <b>Địa chỉ:</b> <span>{info.address}</span>
      </p>
      <p>
        <b>SĐT:</b> <span>{info.phone}</span>
      </p>
    </div>
  );
};
