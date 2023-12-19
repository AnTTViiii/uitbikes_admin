import React from 'react'
import './summarybox.css'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import { colors, dot3digits } from '../configs/functions'
import {
    Chart as ChartJS, CategoryScale, LinearScale, 
    PointElement, LineElement, Title, Tooltip, Legend 
} from 'chart.js'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, 
    LineElement, Title, Tooltip, Legend
)

const SummaryBox = ({ item }) => {
  return (
    <div className='box summary-box'>
        <div className="summary-box__info">
            <div className="summary-box__info__title">
                <div>{item.title}</div>
                <span>{item.subtitle}</span>
            </div>
            <div className="summary-box__info__value">
                <div>{dot3digits(item.value)} {item.unit}</div>
            </div>
        </div>
        <div className="summary-box__chart">
            <CircularProgressbarWithChildren
                value={item.percent} strokeWidth={10}
                styles={buildStyles({
                    pathColor: item.percent < 50 ? colors.red : colors.purple,
                    trailColor: '#edefff', strokeLinecap: 'round'
                })}
            >
                <div className="summary-box__chart__value">
                    {Math.round(item.percent * 100.0) / 100.0}%
                </div>
            </CircularProgressbarWithChildren>
        </div>
    </div>
  )
}

export default SummaryBox
