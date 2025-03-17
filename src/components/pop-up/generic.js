'use client';
import './generic.css'
import React from 'react'
import { useGenericPopUp } from '../../providers/pop-up'
import '../../css/index.css'

export function GenericPopUp({title = 'Alerta!', description='', timeToClose=5000}){    
    const { 
        expandGenericPopUp,
        minimizeGenericPopUp,
        closeGenericPopUp,
        isActive,
        isExpanded 
    } = useGenericPopUp()

    function clickExpand(){        
        if(isExpanded){
            minimizeGenericPopUp()
        }else{
            expandGenericPopUp()
        }
    }
    
    function copyDescricao(){
        navigator.clipboard.writeText(`Titulo: ${title}\nDescription: ${description}`)
    }

    return (
        <div className={`generic-pop-up ${isActive ? '' : ''} ${isExpanded ? 'expanded' : ''}`}>
        {/* <div className={`generic-pop-up ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}> */}
            <div className='pop-up-head'>
                <div className='grid grid-cols-10 overflow-visible!'>
                    <div className='col-span-8 title'><span className="material-symbols-outlined">campaign</span><sumarry>{title}</sumarry></div>
                    <div className='col-span-2 actions pr-2'>
                        <div className='copy' title='Copiar conteúdo' onClick={() => copyDescricao()}><span className="material-symbols-outlined">content_copy</span></div>
                        <div className='close' title='Fechar' onClick={() => closeGenericPopUp()}><span className="material-symbols-outlined">close</span></div>
                    </div>
                </div>
            </div>
            <div className={`pop-up-content ${isExpanded ? 'colapsed' : ''}`} onClick={() => clickExpand()}>
                <div className='desciption'>{description}</div>
            </div>
        </div>
    )
}