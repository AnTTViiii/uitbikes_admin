import React, { useEffect, useState } from 'react'
import './revenue-list.css'
import ProgressBar from '../progressbar/ProgressBar'
import axios from 'axios'

const RevenueList = () => {
    const [rates, setRates] = useState([
        { value: 0, title: 'Tỉ lệ khách đặt hàng trong ngày' },
        { value: 0, title: 'Tỉ lệ hủy đơn' },
        { value: 0, title: 'Tỉ lệ đơn hoàn thành' }
      ]);
    
    useEffect(() => {
        const endpoints = [
          `http://localhost:9090/api/invoices/rates/customerpurchasedtoday`,
          `http://localhost:9090/api/invoices/numberofcancelledorders`,
          `http://localhost:9090/api/invoices/numberofcompletedorders`,
          `http://localhost:9090/api/invoices/numberoforders`
        ];
      
        Promise.all(endpoints.map(endpoint => axios.get(endpoint)))
          .then(responses => {
            setRates([
              { ...rates[0], value: responses[0].data },
              { ...rates[1], value: responses[1].data/responses[3].data*100 },
              { ...rates[2], value: responses[2].data/responses[3].data*100 }
            ]);
          });
    }, [rates]);
    
    return (
        <ul className='revenue-list'>
            {
                rates.map((item, index) => (
                    <li className="revenue-list__item" key={`revenue-${index}`}>
                        <div className="revenue-list__item__title">
                            {item.title}
                            <span>
                                {Math.round(item.value * 100) / 100}%
                            </span>
                        </div>
                        <div>
                            <ProgressBar value={item.value} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default RevenueList
