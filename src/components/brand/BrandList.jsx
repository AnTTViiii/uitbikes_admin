import { BorderColorRounded, ClearRounded } from '@mui/icons-material'
import { Button, TextField, Dialog, DialogContent, IconButton } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Brand } from '../configs/Product'
import './brand-list.css'
import { Transition } from '../configs/functions'

const BrandList = () => {
    const [createPopup, setCreatePopup] = useState(false);
    const openCreatePopup = () => setCreatePopup(true);
    const closeCreatePopup = () => setCreatePopup(false);

    const [updatePopup, setUpdatePopup] = useState(false);
    const openUpdatePopup = () => setUpdatePopup(true);
    const closeUpdatePopup = () => setUpdatePopup(false);
    const [brandInfo, setBrandInfo] = useState([]);

    return (
        <div className='brand-list'>
            <Button className="create-brand-btn" onClick={openCreatePopup}>
                <BorderColorRounded />
                Thêm hãng mới
            </Button>

            <table className='table-1 brand-list-table'>
                <tr>
                    <th>ID</th>
                    <th>Hình</th>
                    <th>Tên hãng</th>
                    <th>Thao tác</th>
                </tr>
                {
                    Brand.map((b) => (
                        <tr>
                            <td>{b.id}</td>
                            <td className='img'><img src={b.image} alt={b.name} /></td>
                            <td>{b.name}</td>
                            <td><p className='edit-btn' onClick={() => {openUpdatePopup(); setBrandInfo(b)}}>Sửa</p></td>
                        </tr>
                    ))
                }
            </table>

            <Dialog open={createPopup} TransitionComponent={Transition}
                    keepMounted onClose={closeCreatePopup}
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <CreateBrand closePopup={closeCreatePopup}/>
                </DialogContent>
            </Dialog>

            <Dialog open={updatePopup} TransitionComponent={Transition}
                    keepMounted onClose={closeUpdatePopup}
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <UpdateBrand brand={brandInfo} closePopup={closeUpdatePopup}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BrandList

export const CreateBrand = props => {
    const namelRef = useRef();
    const imgRef = useRef();

    return (
        <div className='create-brand'>
            <div className='popup-title'>
                <h2>Thêm hãng mới</h2>
                <IconButton className='popup-close-btn' onClick={props.closePopup}><ClearRounded /></IconButton>
            </div>
            <TextField ref={namelRef} fullWidth id="outlined-basic" className='brand-name' label="Tên hãng" type='text' variant="outlined" />
            <label id='brand-img-label' for='brand-img'>Chọn file hình</label>
            <input ref={imgRef} id='brand-img' type='file' />

            <Button variant="contained" className='popup-submit-btn' onClick={props.closePopup}>                             
                Thêm hãng
            </Button>
        </div>
    )
}

export const UpdateBrand = props => {
    const namelRef = useRef(null);
    const imgRef = useRef();
    console.log(props.brand.name)
    
    return (
        <div className='update-brand'>
            <div className='popup-title'>
                <h2>Cập nhật hãng</h2>
                <IconButton className='popup-close-btn' onClick={props.closePopup}><ClearRounded /></IconButton>
            </div>
            <div className='brand-name'>
                <p>Tên hãng</p>
                <input ref={namelRef} defaultValue={props.brand.name} type='text' />
            </div>
            <label id='brand-img-label' for='brand-img'>Chọn file hình</label>
            <input ref={imgRef} id='brand-img' type='file' />

            <Button variant="contained" className='popup-submit-btn' onClick={props.closePopup}>                             
                Cập nhật
            </Button>
        </div>
    )
}