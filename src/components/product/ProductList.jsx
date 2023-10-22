import {
  BorderColorRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTypeName, getBrandName, dot3digits } from "../configs/functions";
import "./product-list.css";
import TypeList from "../type/TypeList";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState(
    sessionStorage.getItem("type")
      ? JSON.parse(sessionStorage.getItem("type"))
      : 0
  );
  const handleChangeType = (val) => {
    axios
      .get("http://localhost:9090/api/products/type/" + val)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setType(val);
    sessionStorage.setItem("type", JSON.stringify(val));
  };
  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:9090/api/products/type/" + type)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [type, data]);
  // function handleDisplay() {
  //     setDisplay(!display)
  // }
  return (
    <div className="product-list">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to={"/new-product"}>
          <Button className="create-btn">
            <BorderColorRounded />
            Thêm xe mới
          </Button>
        </Link>
        <TypeList handleChangeType={handleChangeType} />
      </div>
      <div>
        <table className="table-1 product-list-table">
          <tr>
            <th>STT</th>
            <th>Hình</th>
            <th>Tên</th>
            <th>Màu</th>
            <th>Phân khối</th>
            <th>Năm SX</th>
            <th>Loại xe</th>
            <th>Hãng xe</th>
            <th>Giá (đ)</th>
            <th>Slg</th>
            <th>Hiển thị</th>
            <th colspan="2">Thao tác</th>
          </tr>
          {data &&
            data.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td className="img">
                  <img src={product.image} alt={product.name} />
                </td>
                <td>
                  <p className="col-name" title={product.name}>
                    {product.name}
                  </p>
                </td>
                <td>{product.color}</td>
                <td>{product.cc} cc</td>
                <td>{product.date}</td>
                <td>{product.type.name}</td>
                <td>{product.brand.name}</td>
                <td>{dot3digits(product.price)}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.isActive ? (
                    <VisibilityRounded />
                  ) : (
                    <VisibilityOffRounded />
                  )}
                </td>
                <td>
                  <Link to={"/edit-product/" + product.id} state={product}>
                    <p className="edit-btn">Sửa</p>
                  </Link>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default ProductList;
