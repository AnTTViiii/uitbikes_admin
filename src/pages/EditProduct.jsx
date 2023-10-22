import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dot3digits, typeData } from "../components/configs/functions";
import { Check, Error } from "@mui/icons-material";

function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [brandData, setBrandData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:9090/api/brands").then((response) => {
      setBrandData(response.data);
    });
  }, [brandData]);
  const [imageUrl, setImageUrl] = useState(product.image);
  const [remainImage, setRemainImage] = useState(true);
  const [loadImage, setLoadImage] = useState(false);
  const [loadSucces, setLoadSuccess] = useState(false);
  const processFileImage = async (e) => {
    var file = e.target.files[0];

    var POST_URL = "https://api.cloudinary.com/v1_1/dvmxvwqev/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
      console.log("changed");
      uniqueId = "dvmxvwqev" + new Date().getTime();
      var size = file.size;
      var sliceSize = 10 * 1000000;
      var start = 0;

      setTimeout(loop, 500);

      function loop() {
        console.log("looping");
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = file.slice(start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 500);
        }
      }
    }

    async function send(piece, start, end, size) {
      // console.log("end", end);

      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", "dvmxvwqev");
      formdata.append("upload_preset", "uitbikes_image");

      const headers = {
        Accept: "/",
        "Content-Type": "multipart/form-data",
      };
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["X-Requested-With"] = "XMLHttpRequest";
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
      const requestConfig = {
        url: POST_URL,
        method: "POST",
        data: formdata,
        headers,
      };
      const response = await axios(requestConfig);
      if (response?.data?.asset_id) {
        //Here i am trying to print the output of the response after the video is posted in cloudinary
        console.log(response.data.url, "response");
        setImageUrl(response.data.url);
        setLoadImage(true);
      }
    }
  };
  const nameRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(
    success !== null ? true : false
  );
  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };
  const colorRef = useRef();
  const dateRef = useRef();
  const ccRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const [type, setType] = useState(product.type);
  const [brand, setBrand] = useState(product.brand);
  const [isActive, setIsActive] = useState(
    product.isActive === 1 ? true : false
  );
  const descRef = useRef();

  const handleChooseBrand = (item) => {
    setBrand(item);
  };

  const handleChooseType = (item) => {
    setType(item);
  };

  useEffect(() => {
    if (loadImage) {
      setLoadSuccess(true);
      setSuccess("File hình ảnh đã được tải lên.");
      setShowAlertSuccess(true);
    }
  }, [loadImage, success, showAlertSuccess]);

  const changeHandler = () => {
    const name = nameRef.current.value;
    const color = colorRef.current.value;
    const date = dateRef.current.value;
    const cc = ccRef.current.value;
    const price = priceRef.current.value;
    const quantity = quantityRef.current.value;
    const desc = descRef.current.value;
    if (!name || !color || !date || !cc || !price || !quantity || !desc) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!remainImage) {
      if (!loadImage) {
        return setAlertError("File hình ảnh chưa được tải lên.");
      }
      if (!loadSucces) {
        return setAlertError(
          "File hình ảnh đang được tải lên, vui lòng chờ trong giây lát."
        );
      }
    }
    const productDetail = {
      name: name,
      color: color,
      cc: cc,
      date: date,
      isActive: isActive ? 1 : 0,
      price: price,
      quantity: quantity,
      type: type,
      brand: brand,
      image: imageUrl,
      describe: desc,
    };
    axios
      .put("http://localhost:9090/api/products/" + product.id, productDetail)
      .then((response) => {
        console.log(response.data);
        navigate("/products");
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Sửa sản phẩm</h1>
        <Grid container spacing={3} rowSpacing={4} marginBottom={3}>
          <Grid item md={8} sm={6} xs={12}>
            <TextField
              label="Tên sản phẩm"
              fullWidth
              defaultValue={product.name}
              inputRef={nameRef}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextField
              fullWidth
              label="Màu"
              defaultValue={product.color}
              inputRef={colorRef}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Năm sản xuất"
              type="number"
              fullWidth
              defaultValue={product.date}
              inputRef={dateRef}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Phân khối"
              fullWidth
              defaultValue={product.cc}
              inputRef={ccRef}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Giá sản phẩm"
              fullWidth
              type="number"
              defaultValue={dot3digits(product.price)}
              inputRef={priceRef}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Số lượng"
              type="number"
              fullWidth
              defaultValue={product.quantity}
              inputRef={quantityRef}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-brand-label">Hãng xe</InputLabel>
              <Select
                fullWidth
                labelId="select-brand-label"
                id="select-brand"
                value={brand != null ? brand.id : product.brand.id}
                label="Hãng xe"
                onChange={(e, value) => handleChooseBrand(value.props.item)}
              >
                {brandData &&
                  brandData.map((child) => (
                    <MenuItem value={child.id} key={child.id} item={child}>
                      {child.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-type-label">Loại xe</InputLabel>
              <Select
                labelId="select-type-label"
                id="select-type"
                value={type != null ? type.id : product.type.id}
                defaultValue={product.type.id}
                label="Loại xe"
                onChange={(e, value) => handleChooseType(value.props.item)}
              >
                {typeData &&
                  typeData.map(
                    (child) =>
                      child.id !== 0 && (
                        <MenuItem value={child.id} key={child.id} item={child}>
                          {child.name}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12} sm={12}>
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={4}
              defaultValue={product.describe}
              inputRef={descRef}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Box>
              <InputLabel id="image-label" sx={{ marginBottom: 2 }}>
                Ảnh sản phẩm
              </InputLabel>
              <img src={product.image} alt="" width={50} />
            </Box>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <InputLabel id="image-label" sx={{ marginBottom: 1 }}>
                  Thay đổi ảnh
                </InputLabel>
                <input
                  type="file"
                  labelId="image-label"
                  id="image"
                  onChange={(e) => {
                    setRemainImage(false);
                    processFileImage(e);
                  }}
                />
              </div>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      // defaultChecked={product.isActive === 1 ? true : false}
                    />
                  }
                  label="Hiển thị"
                  labelPlacement="start"
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        {showAlert && (
          <Alert
            icon={<Error fontSize="inherit" />}
            severity="warning"
            sx={{ margin: "20px 0" }}
          >
            {error}
          </Alert>
        )}
        {showAlertSuccess && (
          <Alert
            icon={<Check fontSize="inherit" />}
            severity="success"
            sx={{ margin: "20px 0" }}
          >
            {success}
          </Alert>
        )}
        <Button onClick={changeHandler}>Lưu thay đổi</Button>
      </Box>
    </div>
  );
}

export default EditProduct;
