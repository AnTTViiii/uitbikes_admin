import React from 'react'
import './box.css'

const Box = props => {
    const className = {
        box: 'box',
        purple: props.purple && 'box-purple',
        fullheight: props.fullheight && 'box-fullheight'
    }
    return (
        <div className={Object.values(className).join(' ')}>
            {props.children}
        </div>
    )
}

export default Box
