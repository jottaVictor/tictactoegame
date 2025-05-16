'use client'
import React, { createContext, useContext, useState, useRef } from 'react';
import { log } from '@utils/utils'

const BlurContext = createContext({
    showBlur: () => {},
    hideBlur: () => {},
    isActive: false
});

export const BlurProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const countBlurActive = useRef(0)

    const showBlur = () => {
        setIsActive(true)
        countBlurActive.current++
        log("The count of blur active was change", countBlurActive.current)
        log("The blush was showed")
    }

    const hideBlur = (important = false) => {
        if(countBlurActive.current === 1 || important)
            setIsActive(false)
        
        if(countBlurActive > 0)
            countBlurActive.current--
        else
            countBlurActive.current = 0
        
        log("The count of blur active was change", countBlurActive.current, important ? " with important " : "")
    }

    return (
        <BlurContext.Provider value={{ showBlur, hideBlur, isActive }}>
            {children}
        </BlurContext.Provider>
    )
}

export const useBlur = () => useContext(BlurContext)