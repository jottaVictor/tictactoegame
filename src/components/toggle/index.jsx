import React from 'react'

import './index.css'

export default function Toogle({target=false, onChange=() => {}, title="Clique para mudar", yes="sim", no="não", name}){
    return(
        <label className="check-slider" tabIndex="0" title={title}>
            <input name={name} tabIndex={-1} checked={target} onChange={onChange} type="checkbox"/>
            <span className='text'>{target ? yes : no}</span>
            <span className='slider'></span>
        </label>
    )
}