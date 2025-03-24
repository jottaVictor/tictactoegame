'use client'

import React, { useEffect, useState } from 'react'
import { useBlur } from '../../providers/blur';
import './index.css'

export default function Blur(){
    const { isActive } = useBlur()

    return (<div id='blur' className={`${isActive ? 'active' : ''}`}></div>)
}