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
          unit: "sản phẩm",
        },
        {
          title: "Hãng xe bán chạy nhất",
          subtitle: "",
          value: 0,
          percent: 0,
          unit: "sản phẩm",
        },
    ]);
    
    useEffect(() => {
        const endpoints = [
          `http://localhost:9090/api/invoices/bestsell/product`,
          `http://localhost:9090/api/invoices/bestsell/type`,
          `http://localhost:9090/api/invoices/bestsell/brand`
        ];
    
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          (responses) => {
            setSummary([
              {
                ...summary[0],
                subtitle: responses[0].data.name,
                value: responses[0].data.count,
                percent: responses[0].data.percent
              },
              {
                ...summary[1],
                subtitle: responses[1].data.name,
                value: responses[1].data.count,
                percent: responses[1].data.percent
              },
              {
                ...summary[2],
                subtitle: responses[2].data.name,
                value: responses[2].data.count,
                percent: responses[2].data.percent
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