import React, { useEffect, useState } from 'react'
import './overall-list.css'
import { PaidRounded, Inventory2Rounded, LocalShippingRounded, Person2Rounded } from '@mui/icons-material'
import axios from 'axios'
import { dot3digits } from '../configs/functions'

const icons = [
  <Person2Rounded />,
  <Inventory2Rounded />,
  <LocalShippingRounded />,
  <PaidRounded />
]
const OverallList = () => {
  const [overall, setOverall] = useState([
    { value: '', title: 'Người dùng' },
    { value: '', title: 'Sản phẩm' },
    { value: '', title: 'Đơn hàng' },
    { value: '', title: 'Doanh thu' },
  ]);

  useEffect(() => {
    const endpoints = [
      `http://localhost:9090/api/accounts/countaccount`,
      `http://localhost:9090/api/products/countproduct`,
      `http://localhost:9090/api/invoices/countinvoice`,
      `http://localhost:9090/api/invoices/revenue`
    ];
  
    Promise.all(endpoints.map(endpoint => axios.get(endpoint)))
      .then(responses => {
        setOverall([
          { ...overall[0], value: responses[0].data },
          { ...overall[1], value: responses[1].data },
          { ...overall[2], value: responses[2].data },
          { ...overall[3], value: responses[3].data }
        ]);
      });
  }, [overall]);

  return (
    <ul className='overall-list'>
      {
        overall.map((item, index) => (
          <li className="overall-list__item" key={`overall-${index}`}>
            <div className="overall-list__item__icon">
              {icons[index]}
            </div>
            <div className="overall-list__item__info">
              <div className="title">
                  {dot3digits(item.value)} {index === 3 ? ' đ' : ''}
              </div>
              <span>{item.title}</span>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default OverallList
