import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Transition, dot3digits, getGender, invoiceStatus } from '../configs/functions';
import { Button, Dialog, DialogContent, MenuItem, Select } from '@mui/material';
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
                <DialogContent>
                    <CustomerInfo info={customerInfo} closePopup={closeCutomerInfoPopup}/>
                </DialogContent>
            </Dialog>

            <Dialog open={invoiceDetailPopup} TransitionComponent={Transition}
                    keepMounted onClose={closeInvoiceDetailPopup}
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <OrderDetails details={invoiceDetail} closePopup={closeInvoiceDetailPopup}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OrderList

export const OrderDetails = props => {
    const details = props.details;
    return (
        <div className='order-detail'>
            <h1>Chi tiết đơn đặt hàng</h1>
            <table>
                <tr>
                    <th>STT</th>
                    <th>Mã SP</th>
                    <th>Tên SP</th>
                    <th>Màu</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                </tr>
                {details.map((d, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{d.product.id}</td>
                        <td>{d.product.name}</td>
                        <td>{d.product.color}</td>
                        <td>{d.product.price}</td>
                        <td>{d.quantity}</td>
                    </tr>
                ))}
            </table>
            <Button onClick={props.closePopup}>OK</Button>
        </div>
    )
}

export const CustomerInfo = props => {
    return (
        <div className='order-detail'>
            <h1>Thông tin khách hàng</h1>
            <div>
                <p>Tên KH: <span>{props.info.name}</span></p>
                <p>Giới tính: <span>{getGender(props.info.gender)}</span></p>
                <p>Địa chỉ: <span>{props.info.address}</span></p>
                <p>SĐT: <span>{props.info.phone}</span></p>
                <p>CCCD/CMT: <span>{props.info.idNumber}</span></p>
            </div>
            <Button onClick={props.closePopup}>OK</Button>
        </div>
    )
}