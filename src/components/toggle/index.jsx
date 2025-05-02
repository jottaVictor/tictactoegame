import React from 'react'

import './index.css'

export default function Toogle({target, onChange}){
    return(
        <label className="check-slider" tabIndex="0">
            <input tabIndex={-1} checked={target} onChange={onChange} type="checkbox"/>
            <span className='slider'></span>
        </label>
    )
}