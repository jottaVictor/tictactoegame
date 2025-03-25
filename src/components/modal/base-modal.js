'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useBlur } from '@providers/blur'
import { useControllerModal } from '@providers/controller-modal'
import '@components/modal/base-modal.css'

export default function BaseModal(
    {
        Head = null, 
        Content = null, 
        Footer = null, 
        title = 'Aviso', 
        description = '',
        isExpanded: defaultExpanded = true,
        alwaysExpanded = true,
        type = 'base',
        style = {},
        ...props
    }
){
    const {showBlur, hideBlur} = useBlur()
    const { closeModalById } = useControllerModal()
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
        isExpanded,
        alwaysExpanded,
        type,
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
            if(!isActive){
                hideBlur()
                setTimeout(() => {
                    closeModalById(props.id)
                }, 1000);
            }
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

    useEffect(
        () => {
            setTimeout(
                () => {
                    closeModal()
                }
            , 5000)
        }
    ,[props.id])

    return (
        <div className={`modal ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''} ${type}`} style={style}  onClick={clickExpand}>
            <div className='head'>
                {Head ? <Head {...commonProps}/> : <BaseHead {...commonProps} /> }
            </div>
            <div className={`content ${isExpanded ? 'expanded' : ''}`} title={!alwaysExpanded ? (isExpanded ? 'Clique para ver menos' : 'Clique para ver mais') : ''}>
                {Content ? <Content {...commonProps}/> : <BaseDescription {...commonProps}/>}
            </div>
            <div className='footer'>
                {Footer && <Footer {...commonProps}/>}
            </div>       
        </div>
    )
}

export function BaseHead(props){
    return(
        <div className='grid grid-cols-10 pl-[8px]'>
            <div className='col-span-8 title'><label>{props.title}</label></div>
            <BaseAction copyDescription={props.copyDescription} closeModal={props.closeModal}/>
        </div>
    )
}

export function BaseDescription(props){
    return (
        <p className='description'>{props.description || 'Conteúdo da mensagem aqui'}</p>
    )
}

export function BaseAction(props){
    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className='col-span-2 actions pr-2'>
            <div className='copy' title='Copiar conteúdo' onClick={(e) => { props.copyDescription(); stopPropagation(e)}}><span className="material-symbols-outlined">content_copy</span></div>
            <div className='close' title='Fechar' onClick={(e) => { props.closeModal(); stopPropagation(e)}}><span className="material-symbols-outlined">close</span></div>
        </div>
    )
}