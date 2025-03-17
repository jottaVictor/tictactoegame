'use client'
import React, { createContext, useContext, useState } from 'react';
import { useBlush } from './blush'

const GenericPopUpContext = createContext({
    showGenericPopUp: () => {},
    hideGenericPopUp: () => {},
    expandGenericPopUp: () => {},
    minimizeGenericPopUp: () => {},
    closeGenericPopUp: () => {},
    isActive: false,
    isExpanded: false
});

export const GenericPopUpProvider = ({ children }) => {
    const {showBlush, hideBlush} = useBlush()
    const [isActive, setIsActive] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)

    const showGenericPopUp = () => {
        setIsActive(true)
        console.log("The generic popUp was showed")
    }

    const hideGenericPopUp = () => {
        setIsActive(false)
        console.log("The generic popUp was hidden")
    }

    const expandGenericPopUp = () => {
        setIsExpanded(true)
        showBlush()
    }

    const minimizeGenericPopUp = () => {
        setIsExpanded(false)
        hideBlush()
    }

    const closeGenericPopUp = () => {
        hideGenericPopUp()
        hideBlush()
    }

    return (
        <GenericPopUpContext.Provider value={{ showGenericPopUp, hideGenericPopUp, expandGenericPopUp, minimizeGenericPopUp, closeGenericPopUp, isExpanded, isActive }}>
            {children}
        </GenericPopUpContext.Provider>
    );
};

export const useGenericPopUp = () => useContext(GenericPopUpContext)