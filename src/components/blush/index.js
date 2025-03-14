'use client'

import React, { useEffect, useState } from 'react'
import { useBlush } from '../../providers/blush';
import './index.css'

export default function Blush(){
    const { blushIsVisible } = useBlush()

    return (<div id='blush' className={blushIsVisible === null ? '' : (blushIsVisible ? "blush-fade-in" : "blush-fade-out")}></div>)
}