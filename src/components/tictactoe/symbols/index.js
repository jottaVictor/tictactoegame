import './symbols.css'
import React from 'react'

export const Symbol0 = (style = '') => {
    return (
        <div className='symbol0'>
            <div className={`main-diagonal ${style}`}></div>
            <div className={`secondary-diagonal ${style}`}></div>
        </div>
    )
}

export const Symbol1 = (style = '') => {
    return (
        <div className='symbol1'>
            <div className={`main ${style}`}></div>
        </div>
    )
}

