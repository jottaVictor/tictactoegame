'use client'
import React, { createContext, useContext, useState } from 'react';
import { useBlush } from './blush'

const GenericPopUpContext = createContext({
    showGenericPopUp: () => {},
    hideGenericPopUp: () => {},
    expandGenericPopUp: () => {},
    minimizeGenericPopUp: () => {},
    closeGenericPopUp: () => {},
    genericPopUpAnimation: ''
});

export const GenericPopUpProvider = ({ children }) => {
    const { showBlush, hideBlush } = useBlush()
    const [genericPopUpAnimation, setGenericPopUpAnimation] = useState('');

    const showGenericPopUp = () => {
        setGenericPopUpAnimation('generic-fade-in')
        console.log("The generic popUp was showed")
    }

    const hideGenericPopUp = () => {
        setGenericPopUpAnimation('generic-fade-out')
        console.log("The generic popUp was hidden")
    }

    const expandGenericPopUp = () => {
        setGenericPopUpAnimation('pop-up-transaction-expand')
        showBlush()
    }

    const minimizeGenericPopUp = () => {
        setGenericPopUpAnimation('pop-up-transaction-minimize')
        hideBlush()
    }

    const closeGenericPopUp = () => {
        hideGenericPopUp()
        hideBlush()
    }

    return (
        <GenericPopUpContext.Provider value={{ showGenericPopUp, hideGenericPopUp, expandGenericPopUp, minimizeGenericPopUp, closeGenericPopUp, genericPopUpAnimation }}>
            {children}
        </GenericPopUpContext.Provider>
    );
};

export const useGenericPopUp = () => useContext(GenericPopUpContext)