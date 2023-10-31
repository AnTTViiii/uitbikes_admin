import React, { useEffect } from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'
import './customerlist.css'
import { Transition } from '../configs/functions'
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
    <div className='customer-list'>
      <table className='table-1 customer-list-table'>
        <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Số điện thoại</th>
            <th>Số dư ví</th>
            <th>Thao tác</th>
        </tr>
        {
          data.map((item) => (
            <tr>
              <td>{item.customer.id}</td>
              <td className='img' style={{textAlign:'-webkit-center'}}>
                <Avatar
                  src={item.avatar}
                  alt={item.customer.id}
                  sx={{ width: "3vw", height: "3vw"}}
                />
              </td>
              <td>{item.username}</td>
              <td>{item.customer.phone}</td>
              <td>{dot3digits(item.customer.balance)}</td>
              <td onClick={() => {openViewPopup(); setCustomerInfo(item.customer)}}>
                <p className='edit-btn'>Xem chi tiết</p>
              </td>
            </tr>
          ))
        }
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

export const ViewCustomer = props => {
  return (
    props.customer !== undefined ? (
      <div className='view-customer'>
        <tr style={{textAlign:'-webkit-center'}}>
          <td colSpan={2} >
            <Avatar
                src={props.avatar}
                alt={props.customer.id}
                sx={{ width: "4vw", height: "4vw"}}
            />
          </td>
        </tr>
        <tr>
          <th>Mã khách hàng</th>
          <td>{props.customer.id}</td>
        </tr>
        <tr>
          <th>Tên</th>
          <td>{props.customer.name}</td>
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
          <td>{props.customer.date !== undefined ? (props.customer.date == null ? '' : new Date(props.customer.date).toLocaleDateString('en-GB')) : ''}</td>
        </tr>
        <tr>
          <th>Địa chỉ</th>
          <td>{props.customer.address}</td>
        </tr>
        <tr>
          <th>Ngày đăng ký</th>
          <td>{props.customer.registerDate !== undefined ? (props.customer.registerDate == null ? '' : new Date(props.customer.registerDate).toLocaleDateString('en-GB')) : ''}</td>
        </tr>
        <tr>
          <th>Số dư ví</th>
          <td>{props.customer.balance !== undefined ? dot3digits(props.customer.balance) : 0} VNĐ</td>
        </tr>
      </div>
    ) : (
        <></>
    )
  )
}
