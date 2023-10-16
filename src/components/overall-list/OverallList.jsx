import React from 'react'
import './overall-list.css'
import { data } from '../../constants'
import { Inventory2Rounded, LocalShippingRounded, Person2Rounded } from '@mui/icons-material'

const icons = [
    <Person2Rounded />,
    <Inventory2Rounded />,
    <LocalShippingRounded />,
]
const OverallList = () => {
  return (
    <ul className='overall-list'>
      {
        data.overall.map((item, index) => (
            <li className="overall-list__item" key={`overall-${index}`}>
                <div className="overall-list__item__icon">
                    {icons[index]}
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {item.value}
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
