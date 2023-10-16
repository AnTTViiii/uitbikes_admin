import { BorderColorRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { Brand } from '../configs/Product'
import './brand-list.css'

const BrandList = () => {
  return (
    <div className='brand-list'>
        <Button className="create-brand-btn">
            <BorderColorRounded />
            Thêm hãng mới
        </Button>

        <table className='brand-list-table'>
            <tr>
                <th>ID</th>
                <th>Hình</th>
                <th>Tên hãng</th>
                <th colspan='2'>Thao tác</th>
            </tr>
            {
                Brand.map((b) => (
                    <tr>
                        <td>{b.id}</td>
                        <td className='img'><img src={b.image} alt={b.name} /></td>
                        <td>{b.name}</td>
                        <td>Sửa</td>
                        <td>Xóa</td>
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default BrandList

export const CreateBrand = () => {
    return (
        <div></div>
    )
}
