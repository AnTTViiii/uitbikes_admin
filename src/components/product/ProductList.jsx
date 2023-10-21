import {
  BorderColorRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import ProductData from "../configs/Product";
import { getTypeName, getBrandName, dot3digits } from "../configs/functions";
import "./product-list.css";
import TypeList from "../type/TypeList";

const ProductList = () => {
  const [display, setDisplay] = useState(false);
  // function handleDisplay() {
  //     setDisplay(!display)
  // }
  return (
    <div className="product-list">
      <Button className="create-product-btn">
        <BorderColorRounded />
        Thêm xe mới
      </Button>
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
          {ProductData.map((product, index) => (
            <tr>
              <td>{index + 1}</td>
              <td className="img">
                <img src={product.image} alt={product.name} />
              </td>
              <td>
                <p className="col-name">{product.name}</p>
              </td>
              <td>{product.color}</td>
              <td>{product.cc} cc</td>
              <td>{product.date}</td>
              <td>{getTypeName(product.type_id)}</td>
              <td>{getBrandName(product.brand_id)}</td>
              <td>{dot3digits(product.price)}</td>
              <td>{product.quantity}</td>
              <td>
                {product.is_active ? (
                  <VisibilityRounded />
                ) : (
                  <VisibilityOffRounded />
                )}
              </td>
              <td>
                <p className="edit-btn">Sửa</p>
              </td>
              <td>
                <p className="del-btn">Xóa</p>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ProductList;
