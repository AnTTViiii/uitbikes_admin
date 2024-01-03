import { BorderColorRounded, Check, ClearRounded, Error } from '@mui/icons-material'
import { Button, TextField, Dialog, DialogContent, IconButton, Alert } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import './brand-list.css'
import { Transition } from '../configs/functions'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const BrandList = () => {
    const [createPopup, setCreatePopup] = useState(false);
    const openCreatePopup = () => setCreatePopup(true);
    const closeCreatePopup = () => setCreatePopup(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9090/api/brands")
            .then((response) => {
              setData(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
    }, [data]);

    return (
        <div className='brand-list'>
            <Button className="create-btn" onClick={openCreatePopup}>
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
                    data && data.map((b) => (
                        <tr>
                            <td>{b.id}</td>
                            <td className='img'><img src={b.image} alt={b.name} /></td>
                            <td>{b.name}</td>
                            <td><p className='edit-btn'><Link to={'/edit-brand/' + b.id}>Sửa</Link></p></td>
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
        </div>
    )
}

export default BrandList

export const CreateBrand = props => {
    const navigate = useNavigate();
    const nameRef = useRef();

    const [imageUrl, setImageUrl] = useState("");
    const [loadSucces, setLoadSuccess] = useState(false);

    const handleUploadImage = (e) => {
        var file = e.target.files[0];
        var POST_URL = "https://api.cloudinary.com/v1_1/dvmxvwqev/upload";
        console.log("uploading...");
        setAlertError("Đang tải lên hình ảnh...");
        
        var formdata = new FormData();
        formdata.append("file", file);
        formdata.append("upload_preset", "uitbikes_image");
    
        axios.post(POST_URL, formdata).then((res)=>{
            console.log(res.data); 
            setImageUrl(res.data.url);
            setError(null);
            setShowAlert(false); 
            setSuccess("File hình ảnh đã được tải lên.")
            setLoadSuccess(true);
            setShowAlertSuccess(true);
            document.getElementById('input-file-img').src = res.data.url;
        });
    }

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showAlert, setShowAlert] = useState(error !== null ? true : false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(success !== null ? true : false);
    const setAlertError = (error) => {
        setError(error);
        setShowAlert(true);
    };

    const handleCreate = () => {
        const name = nameRef.current.value;

        if (!name) return setAlertError("Vui lòng nhập đầy đủ thông tin!");
        if (imageUrl === "") return setAlertError("Vui lòng tải lên hình ảnh.");
        if (!loadSucces) return setAlertError("File hình ảnh đang được tải lên, vui lòng chờ trong giây lát.");
        
        const brandDetail = {
            name: name,
            image: imageUrl
        };
        
        axios.post("http://localhost:9090/api/brands", brandDetail)
            .then(res => {
                console.log(res.data);
                navigate("/brands");
                props.closePopup();
                setImageUrl("");
                setLoadSuccess(false);
                setError(null);
                setSuccess(null);
                setShowAlert(false);
                setShowAlertSuccess(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='create-brand'>
            <div className='popup-title'>
                <h2>Thêm hãng mới</h2>
                <IconButton className='popup-close-btn' onClick={props.closePopup}><ClearRounded /></IconButton>
            </div>
            <TextField inputRef={nameRef} fullWidth label="Tên hãng" variant="outlined" />
            <div className='input-file-field'>
                <img id='input-file-img' className='input-file-show' alt=''/>
                <label id='input-file-label' htmlFor='input-file-input'>Chọn file hình</label>
                <input id='input-file-input' type='file' accept='.png, .jpg, .gif, .jpeg'
                    onChange={handleUploadImage} />
            </div>
            {showAlert && 
                <Alert icon={<Error fontSize="inherit" />}
                    severity="warning" sx={{ margin: "20px 0" }}
                >
                    {error}
                </Alert>
            }
            {showAlertSuccess && 
                <Alert icon={<Check fontSize="inherit" />}
                    severity="success" sx={{ margin: "20px 0" }}
                >
                    {success}
                </Alert>
            }
            <Button variant="contained" className='popup-submit-btn' onClick={handleCreate}>                             
                Thêm hãng
            </Button>
        </div>
    )
}