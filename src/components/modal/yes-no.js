'use client';
import './yes-no.css'
import '../../css/index.css'
import React, { useEffect, useState } from 'react'
import { useBlur } from '../../providers/blur';
import { BaseModal, BaseDescription, BaseAction } from './base-modal'

//export function YesNo(
//    {
//        title = 'Alerta!',
//        description='',
//        alwaysExpanded=false,
//        //here is a destructuring to allow passing the name 'isExpanded' as a prop
//        isExpanded: defaultExpanded=false,
//        timeToClose=5000
//    }
//){
//    const {showBlush, hideBlush} = useBlush()
//    const [isActive, setIsActive] = useState(true)
//    const [isExpanded, setIsExpanded] = useState(defaultExpanded)
//
//    useEffect(
//        () => {
//            console.log("A popup was active")
//        }
//    , [isActive])
//
//    const hidePopUp = () => {
//        setIsActive(false)
//        console.log("The generic popUp was hidden")
//    }
//
//    const expandPopUp = () => {
//        setIsExpanded(true)
//        // showBlush()
//    }
//
//    const minimizePopUp = () => {
//        setIsExpanded(false)
//        // hideBlush()
//    }
//
//    const closePopUp = () => {
//        hidePopUp()
//        // hideBlush()
//    }
//
//    function clickExpand(){
//        if(alwaysExpanded)
//            return
//
//        if(isExpanded)
//            minimizePopUp()
//        else
//            expandPopUp()
//    }
//
//    function noFunc(){
//        return
//    }
//
//    function yesFunc(){
//        return
//    }
//
//    //--------------
//    // const { 
//    //     expandGenericPopUp,
//    //     minimizeGenericPopUp,
//    //     closeGenericPopUp,
//    //     isActive,
//    //     isExpanded 
//    // } = useGenericPopUp()
//
//    useEffect(
//        () => {
//            if(isExpanded)
//                showBlush()
//            else
//                hideBlush()
//        }
//    , [isExpanded])
//
//    useEffect(
//        () => {
//            if(isActive && alwaysExpanded){
//                return expandPopUp()
//            }
//            if(!isActive)
//                hideBlush()
//        }
//    , [isActive])
//    
//    function copyDescription(){
//        navigator.clipboard.writeText(`Titulo: ${title}\nDescription: ${description}`)
//    }
//
//    return (
//        <div className={`generic-pop-up ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
//            <div className='pop-up-head'>
//                <div className='grid grid-cols-10 overflow-visible!'>
//                    <div className='col-span-8 title'><i className="material-symbols-outlined">question_mark </i><label>{title}</label></div>
//                    <div className='col-span-2 actions pr-2'>
//                        <div className='copy' title='Copiar conteúdo' onClick={() => copyDescription()}><i className="material-symbols-outlined">content_copy</i></div>
//                        <div className='close' title='Fechar' onClick={() => closePopUp()}><i className="material-symbols-outlined">close</i></div>
//                    </div>
//                </div>
//            </div>
//            <div className={`pop-up-content ${isExpanded ? 'expanded' : ''}`} onClick={() => clickExpand()}>
//                <div className='description'>{description}</div>
//            </div>
//            <div className='pop-up-footer'>
//                <div className='box-option'>
//                    <span className='no-botton' title='Recusar' onClick={() => noFunc()}>Não</span><i className="material-symbols-outlined">close</i>
//                </div>
//                <div className='box-option'>
//                    <span className='yes-botton' title='Confirmar' onClick={() => yesFunc()}>Sim</span><i className="material-symbols-outlined">check</i>
//                </div>
//            </div>
//        </div>
//        )
//}

export default function YesNo({title = 'Responda', description = '', isExpanded = true, alwaysExpanded = false, noFunc = () => {}, yesFunc = () => {}}){
    const Head = React.memo(({copyDescription, closeModal}) => (
        <div className='grid grid-cols-10'>
            <div className='col-span-8 title'><i className="material-symbols-outlined">person_raised_hand</i><label>{title}</label></div>
            <BaseAction copyDescription={copyDescription} closeModal={closeModal}/>
        </div>
    ))
    
    const Footer = React.memo(({closeModal, yesFunc, noFunc}) => {
        const yesClick = () => {
            yesFunc()
            closeModal()
        }

        const noclick = () => {
            noFunc()
            closeModal()
        }

        return (
            <>
                <div className='box-option' onClick={() => noclick()}>
                    <span className='no-botton' title='Recusar'>Não</span><i className="material-symbols-outlined">close</i>
                </div>
                <div className='box-option' onClick={() => yesClick()}>
                    <span className='yes-botton' title='Confirmar'>Sim</span><i className="material-symbols-outlined">check</i>
                </div>
            </>
        )
    })

    return (
        <BaseModal Head={Head} Content={BaseDescription} Footer={Footer} title={title} description={description} isExpanded={isExpanded} alwaysExpanded={alwaysExpanded} yesFunc={yesFunc} noFunc={noFunc} type='yes-no'/>
    )
}
