'use client'

import React, { useEffect, useState } from 'react'
import { useBlush } from '../../providers/blush';
import './index.css'

export default function Blush(){
    const { blushIsActive } = useBlush()

    return (<div id='blush' className={`${blushIsActive ? 'active' : ''}`}></div>)
}