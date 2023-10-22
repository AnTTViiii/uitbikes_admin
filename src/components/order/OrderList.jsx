import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Transition, dot3digits, getGender, invoiceStatus } from '../configs/functions';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';
import './order-list.css'
//import Invoice from '../configs/Invoice'

const OrderList = () => {
    const [invoice, setInvoice] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:9090/api/invoices`)
            .then(response => {
                setInvoice(response.data);
            });
    }, []);

    //setInvoice(Invoice); //if data not exists
    const updateStatus = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    const [customerInfoPopup, setCustomerInfoPopup] = useState(false);
    const [customerInfo, setCustomerInfo] = useState([]);
    const openCustomerInfoPopup = () => setCustomerInfoPopup(true);
    const closeCutomerInfoPopup = () => setCustomerInfoPopup(false);

    const [invoiceDetailPopup, setInvoiceDetailPopup] = useState(false);
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const openInvoiceDetailPopup = () => setInvoiceDetailPopup(true);
    const closeInvoiceDetailPopup = () => setInvoiceDetailPopup(false);

    return (
        <div className='order-list'>
            <table className='table-1 order-list-table'>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Chi tiết</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                </tr>
                {invoice.map((item, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td><p onClick={() => {openCustomerInfoPopup(); setCustomerInfo(item.customer)}}>Mã #{item.customer.id}</p></td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                        <td><p onClick={() => {openInvoiceDetailPopup(); setInvoiceDetail(item.details)}}>Xem</p></td>
                        <td>{dot3digits(item.total)} đ</td>
                        <td>
                            <Select className='select-box' defaultValue={item.status} size='small' onChange={updateStatus}>
                                {invoiceStatus.map((status, index) =>  (
                                    <MenuItem value={index}>{status}</MenuItem>
                                ))}
                            </Select>
                        </td>
                    </tr>
                ))}
            </table>

            <Dialog open={customerInfoPopup} TransitionComponent={Transition}
                    keepMounted onClose={closeCutomerInfoPopup}
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <h2>Thông tin khách hàng</h2>
                </DialogTitle>
                <DialogContent>
                    <CustomerInfo info={customerInfo} closePopup={closeCutomerInfoPopup}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCutomerInfoPopup}>Đóng</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={invoiceDetailPopup} TransitionComponent={Transition}
                    keepMounted onClose={closeInvoiceDetailPopup}
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <h2>Chi tiết đơn đặt hàng</h2>
                </DialogTitle>
                <DialogContent>
                    <OrderDetails details={invoiceDetail} closePopup={closeInvoiceDetailPopup}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeInvoiceDetailPopup}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default OrderList

export const OrderDetails = ({details}) => {
    return (
        <table className='table-2 order-detail'>
            <tr>
                <th>STT</th>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Màu</th>
                <th>Giá (đ)</th>
                <th>Số lượng</th>
            </tr>
            {details.map((d, index) => (
                <tr>
                    <td>{index+1}</td>
                    <td>{d.product.id}</td>
                    <td>{d.product.name}</td>
                    <td>{d.product.color}</td>
                    <td>{dot3digits(d.product.price)}</td>
                    <td>{d.quantity}</td>
                </tr>
            ))}
        </table>
    )
}

export const CustomerInfo = ({info}) => {
    return (
        <div className='customer-info'>
            <p>
                <span><b>Tên KH:</b> {info.name}</span> 
                <span><b>Giới tính:</b> {getGender(info.gender)}</span>
            </p>
            <p><b>CCCD/CMT:</b> <span>{info.idNumber}</span></p>
            <p><b>Địa chỉ:</b> <span>{info.address}</span></p>
            <p><b>SĐT:</b> <span>{info.phone}</span></p>
        </div>
    )
}