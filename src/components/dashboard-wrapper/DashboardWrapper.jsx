import React, { useEffect, useState } from 'react'
import './dashboard-wrapper.css'
import RevenueByMonths from '../monthly-revenue/RevenueByMonths'
import axios from 'axios';
import SummaryBox from '../summary-box/SummaryBox';
import OverallList from '../overall-list/OverallList';
import RevenueList from '../revenue-list/RevenueList';

const DashboardWrapper = () => {
    const [summary, setSummary] = useState([
        {
          title: "Sản phẩm bán chạy nhất",
          subtitle: "",
          value: 0,
          percent: 0,
          unit: "sản phẩm",
        },
        {
          title: "Loại xe bán chạy nhất",
          subtitle: "",
          value: 0,
          percent: 0,
          unit: "đ",
        },
        {
          title: "Hãng xe bán chạy nhất",
          subtitle: "",
          value: 0,
          percent: 0,
          unit: "đ",
        },
    ]);
    
    useEffect(() => {
        const endpoints = [
          `http://localhost:9090/api/invoices/bestsell/product`,
          `http://localhost:9090/api/invoices/bestsell/type`,
          `http://localhost:9090/api/invoices/bestsell/brand`,
          `http://localhost:9090/api/invoices/revenue`,
        ];
    
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          (responses) => {
            setSummary([
              {
                ...summary[0],
                subtitle: responses[0].data.product.name,
                value: responses[0].data.quantity,
                percent:
                  ((responses[0].data.product.price * responses[0].data.quantity) /
                    responses[3].data) *
                  100,
              },
              {
                ...summary[1],
                subtitle: responses[1].data[1],
                value: responses[1].data[2],
                percent: (responses[1].data[2] / responses[3].data) * 100,
              },
              {
                ...summary[2],
                subtitle: responses[2].data[1],
                value: responses[2].data[3],
                percent: (responses[2].data[3] / responses[3].data) * 100,
              },
            ]);
          }
        )
        .catch((err) => {console.log(err)});
    }, [summary]);
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-wrapper__main'>
                <div className="mb summary-box-wrapper">
                    {summary.map((item) => (
                        <SummaryBox item={item} />
                    ))}
                </div>
                <RevenueByMonths />
            </div>

            <div className='dashboard-wrapper__right'>
                <div className="title mbc">Thống kê</div>
                <OverallList />
                
                <div className="title mbc">Tỉ lệ</div>
                <RevenueList />
            </div>
        </div>
    )
}

export default DashboardWrapper