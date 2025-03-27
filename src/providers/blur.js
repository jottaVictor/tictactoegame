'use client'
import React, { createContext, useContext, useState } from 'react';
import { log } from '@utils/utils'

const BlurContext = createContext({
    showBlur: () => {},
    hideBlur: () => {},
    isActive: false
});

export const BlurProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    const showBlur = () => {
        setIsActive(true)
        log("The blush was showed")
    }
    const hideBlur = () => {
        setIsActive(false)
        log("The blush was hidden")
    }

    return (
        <BlurContext.Provider value={{ showBlur, hideBlur, isActive }}>
            {children}
        </BlurContext.Provider>
    )
}

export const useBlur = () => useContext(BlurContext)