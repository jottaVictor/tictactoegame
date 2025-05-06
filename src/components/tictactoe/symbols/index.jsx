import '@components/tictactoe/symbols/symbols.css'
import React from 'react'

export const Symbol0 = (style = '') => {
    return (
        <div className='symbol0'>
            <div className="main-diagonal"></div>
            <div className="secondary-diagonal"></div>
        </div>
    )
}

export const Symbol1 = () => {
    return (
        <div className='symbol1'>
            <div className="main"></div>
        </div>
    )
}

