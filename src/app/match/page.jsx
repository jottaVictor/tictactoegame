'use client'
import React, { useState, useEffect } from 'react'

import './page.css'

import Mobile from './mobile'
import Desktop from './desktop'
import ConfigMatch from './config-match'
import '@/css/index.css'

export default function Page(){
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            {isMobile ? <Mobile/> : <Desktop/>}
            <ConfigMatch></ConfigMatch>
        </>
    )
}