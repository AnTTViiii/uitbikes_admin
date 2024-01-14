import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Transition } from '../configs/functions'
import { DeleteRounded } from '@mui/icons-material'
import './review-list.css'

const ReviewList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:9090/api/reviews`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [data])

    const [selectedItem, setSelectedItem] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)

    const closePopup = () => {
        setOpenPopup(false)
    }

    const handleDeleteReview = () => {
        axios.delete(`http://localhost:9090/api/reviews/${selectedItem}`)
            .then((res) => {
                if (res.data) {
                    
                    alert("Đã xóa đánh giá.")
                }
                closePopup()
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <div className='review-list'>
        {data && data.map((item) => (
            <div className="review">
                <div className='review-header'>
                    <p><span>{item.username}</span> đã đánh giá ngày <span>{new Date(item.timestamp).toLocaleString()}</span></p>
                    <IconButton className='del-btn' onClick={() => {setSelectedItem(item.id); setOpenPopup(true)}}>
                        <DeleteRounded />
                    </IconButton>
                </div>
                <div className='review-body'>
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="review-detail">
                        <p>{item.product.name}</p>
                        <p>Màu: {item.product.color}</p>
                        
                        <div className="review-content">
                            <div className="review-text">{item.text}</div>
                            <div className="review-imgs">
                                {item.images.map((image) => (
                                    <img src={image.image} alt='review-img' />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}

            <Dialog
                open={openPopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={closePopup}
            >
                <DialogTitle>Thông báo</DialogTitle>
                <DialogContent>
                    Bạn có chắc muốn xóa đánh giá này?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopup}>Không</Button>
                    <Button onClick={handleDeleteReview}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ReviewList
