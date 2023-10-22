import {
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
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { typeData } from "../components/configs/functions";

function NewProduct() {
  const [brandData, setBrandData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/brands").then((response) => {
      setBrandData(response.data);
    });
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loadImage, setLoadImage] = useState(false);
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
  const [typeId, setTypeId] = useState();
  const [brandId, setBrandId] = useState();
  const [isActive, setIsActive] = useState(false);

  const createHandler = () => {
    const name = nameRef.current.value;
    const color = colorRef.current.value;
    const date = dateRef.current.value;
    const cc = ccRef.current.value;
    const price = priceRef.current.value;
    const quantity = quantityRef.current.value;
    if (!name || !color || !date || !cc || !price || !quantity) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    const productDetail = {
      name: name,
      color: color,
      cc: cc,
      date: date,
      isActive: isActive,
      price: price,
      quantity: quantity,
      typeId: typeId,
      brandId: brandId,
    };
    console.log(productDetail);
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
        <h1 style={{ marginBottom: "20px" }}>Thêm sản phẩm mới</h1>
        <Grid container spacing={3} rowSpacing={4}>
          <Grid item md={8} sm={6} xs={12}>
            <TextField label="Tên sản phẩm" fullWidth ref={nameRef} />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextField fullWidth label="Màu" ref={colorRef} />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField label="Năm sản xuất" fullWidth ref={dateRef} />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField label="Phân khối" fullWidth ref={ccRef} />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Giá sản phẩm"
              fullWidth
              type="number"
              ref={priceRef}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Số lượng"
              type="number"
              fullWidth
              ref={quantityRef}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-brand-label">Hãng xe</InputLabel>
              <Select
                fullWidth
                labelId="select-brand-label"
                id="select-brand"
                value={brandId}
                label="Age"
                onChange={(e) => setBrandId(e.target.value)}
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
                value={typeId}
                label="Age"
                onChange={(e) => setTypeId(e.target.value)}
              >
                {typeData &&
                  typeData.map(
                    (child) =>
                      child.id !== 0 && (
                        <MenuItem key={child.id} item={child} value={child.id}>
                          {child.name}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Box>
              <InputLabel id="image-label">Ảnh sản phẩm</InputLabel>
              <input type="file" labelId="image-label" id="image" />
            </Box>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="Hiển thị"
                labelPlacement="start"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button onClick={createHandler}>Thêm mới</Button>
      </Box>
    </div>
  );
}

export default NewProduct;
