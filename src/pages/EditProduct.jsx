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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dot3digits, typeData } from "../components/configs/functions";

function EditProduct() {
  const location = useLocation();
  const product = location.state;
  const [brandData, setBrandData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/brands").then((response) => {
      setBrandData(response.data);
    });
  });
  const [imageUrl, setImageUrl] = useState(product.image);
  const [loadImage, setLoadImage] = useState(false);
  const [type, setType] = useState(product.type.id);
  const [brand, setBrand] = useState(product.brand.id);
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
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextField fullWidth label="Màu" defaultValue={product.color} />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Năm sản xuất"
              type="number"
              fullWidth
              defaultValue={product.date}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField label="Phân khối" fullWidth defaultValue={product.cc} />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Giá sản phẩm"
              fullWidth
              //   type="number"
              defaultValue={dot3digits(product.price)}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <TextField
              label="Số lượng"
              type="number"
              fullWidth
              defaultValue={product.quantity}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-brand-label">Hãng xe</InputLabel>
              <Select
                fullWidth
                labelId="select-brand-label"
                id="select-brand"
                value={brand}
                label="Hãng xe"
                onChange={(e) => setBrand(e.target.value)}
              >
                {brandData &&
                  brandData.map((child) => (
                    <MenuItem value={child.id}>{child.name}</MenuItem>
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
                value={type}
                label="Loại xe"
                onChange={(e) => setType(e.target.value)}
              >
                {typeData &&
                  typeData.map(
                    (child) =>
                      child.id !== 0 && (
                        <MenuItem value={child.id}>{child.name}</MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
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
                <input type="file" labelId="image-label" id="image" />
              </div>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      defaultChecked={product.isActive === 1 ? true : false}
                    />
                  }
                  label="Hiển thị"
                  labelPlacement="start"
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <Button>Lưu thay đổi</Button>
      </Box>
    </div>
  );
}

export default EditProduct;
