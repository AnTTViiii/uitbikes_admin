import { Check, Error } from '@mui/icons-material'
import { Button, Alert } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
// import './update-brand.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateBrand = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const nameRef = useRef();

    const id = location.pathname.split('/')[2];
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9090/api/brands/${id}`)
            .then((res) => setBrand(res.data))
            .catch((err) => {console.log(err)})
    }, [brand, id])
    
    const [imageUrl, setImageUrl] = useState("");
    const [loadSuccess, setLoadSuccess] = useState(false);
    const [currentImage, setCurrentImage] = useState(true);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showAlert, setShowAlert] = useState(error !== null ? true : false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(success !== null ? true : false);
    const setAlertError = (error) => {
        setError(error);
        setShowAlert(true);
    };

    const handleUploadImage = (e) => {
        setCurrentImage(false);
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
        })
        .catch((err) => {console.log(err)});
    }

    const handleUpdate = () => {
        const name = nameRef.current.value;
        
        if (!name) return setAlertError("Vui lòng nhập đầy đủ thông tin!");
        if(!currentImage && !loadSuccess) return setAlertError("File hình ảnh đang được tải lên, vui lòng chờ trong giây lát.");
        
        const brandDetail = {
            name: name,
            image: imageUrl !== "" ? imageUrl : brand.image
        };
        
        axios.put("http://localhost:9090/api/brands/" + id, brandDetail)
            .then(res => {
                console.log(res.data);
                navigate("/brands");
                setImageUrl("");
                setLoadSuccess(false);
                setError(null);
                setSuccess(null);
                setShowAlert(false);
                setShowAlertSuccess(false);
            })
            .catch((err) => {console.log(err)});
    }
    
    return (
        <div className='update-brand'>
            <h2 className='title mbc'>Cập nhật hãng</h2>
            <div className='brand-name'>
                <label>Tên hãng</label>
                <input type="text" ref={nameRef} defaultValue={brand.name} />
            </div>
            <div className='input-file-field'>
                <img id='input-file-img' className='input-file-show' src={brand.image} alt=''/>
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

            <Button variant="contained" className='popup-submit-btn' onClick={handleUpdate}>                             
                Cập nhật
            </Button>
        </div>
    )
}

export default UpdateBrand
