import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueByMonths = () => {
    const [revenueByMonths, setRevenueByMonths] = useState([]);
    useEffect(() => {
      axios
        .get(`http://localhost:9090/api/invoices/revenuebymonth`)
        .then((response) => {
          setRevenueByMonths(response.data);
        })
        .catch((err) => {console.log(err)});
    }, [revenueByMonths]);
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        yAxes: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      elements: {
        bar: {
          backgroundColor: "#9772FB",
          borderRadius: 20,
          borderSkipped: "bottom",
        },
      },
    };
    const chartData = {
      labels: revenueByMonths.labels,
      datasets: [
        {
          label: "Doanh thu",
          data: revenueByMonths.data,
        },
      ],
    };
    return (
      <div className="box">
        <div className="title mbc">Doanh thu trong 12 tháng gần nhất</div>
        <div>
          <Bar options={chartOptions} data={chartData} height={`300px`} />
        </div>
      </div>
    );
  };

export default RevenueByMonths
