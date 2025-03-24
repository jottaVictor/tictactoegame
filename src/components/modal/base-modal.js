'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useBlur } from '../../providers/blur'
import './base-modal.css'

export function BaseModal(
    {
        Head = null, 
        Content = null, 
        Footer = null, 
        title = '', 
        description = '',
        isExpanded: defaultExpanded = true,
        alwaysExpanded = true,
        ...props
    }
){

    const {showBlur, hideBlur} = useBlur()
    const [isActive, setIsActive] = useState(true)
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)

    const closeModal = () => {
        setIsActive(false)
        console.log("The generic Modal was hidden")
    }

    const expandModal = useCallback(() => {
        setIsExpanded(true)
    }, [])

    const minimizeModal = useCallback(() => {
        setIsExpanded(false)
    }, [])

    const clickExpand = () => {
        if(alwaysExpanded)
            return
        
        console.log("Pass here")

        if(isExpanded)
            minimizeModal()
        else
            expandModal()
    }

    const copyDescription = useCallback(() => {
        let __title = title?.trim() ? `Titulo: ${title}\n` : ''
        let __description = description?.trim() ? `Descrição: ${description}` : ''
        navigator.clipboard.writeText(`${__title + __description}`)
    }, [])

    const commonProps = {
        ...props,
        title,
        description,
        showBlur,
        hideBlur,
        isActive,
        setIsActive,
        setIsExpanded,
        closeModal,
        expandModal,
        minimizeModal,
        clickExpand,
        copyDescription,
    };

    useEffect(
        () => {
            if(isActive && alwaysExpanded){
                return expandModal()
            }
            if(!isActive)
                hideBlur()
        }
    , [isActive, expandModal, hideBlur])

    useEffect(
        () => {
            if(isExpanded)
                showBlur()
            else
                hideBlur()
        }
    , [isExpanded])

    return (
        <div className={`modal ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
            <div className='head'>
                {Head && <Head {...commonProps}/>}
            </div>
            <div className={`content ${isExpanded ? 'expanded' : ''}`} title={!alwaysExpanded ? (isExpanded ? 'Clique para ver menos' : 'Clique para ver mais') : ''} onClick={() => clickExpand()}>
                {Content && <Content {...commonProps}/>}
            </div>
            <div className='footer'>
                {Footer && <Footer {...commonProps}/>}
            </div>       
        </div>
    )
}

export function BaseDescription({description}){
    return (
        <p className='description'>{description}</p>
    )
}

export function BaseAction({copyDescription, closeModal}){
    return (
        <div className='col-span-2 actions pr-2'>
            <div className='copy' title='Copiar conteúdo' onClick={() => copyDescription()}><span className="material-symbols-outlined">content_copy</span></div>
            <div className='close' title='Fechar' onClick={() => closeModal()}><span className="material-symbols-outlined">close</span></div>
        </div>
    )
}