'use client';
import './index.css'
import React from 'react'
import { useGenericPopUp } from '../../providers/pop-up'
import '../../css/index.css'

export function GenericPopUp({title = 'Alerta!', description='', timeToClose=5000}){    
    const { 
        expandGenericPopUp,
        minimizeGenericPopUp,
        closeGenericPopUp,
        genericPopUpAnimation 
    } = useGenericPopUp()

    function clickExpand(){        
        if(genericPopUpAnimation == 'pop-up-transaction-expand'){
            minimizeGenericPopUp()
        }else{
            expandGenericPopUp()
        }
    }

    return (
        <div className={`generic-pop-up ${genericPopUpAnimation}`}>
            <div className='pop-up-head'>
                <div className='grid grid-cols-10 overflow-visible!'>
                    <div className='col-span-8 title'>{title}</div>
                    <div className='col-span-2 actions pr-2'>
                        <div className='expand center' title={genericPopUpAnimation == 'pop-up-transaction-expand' ? 'Minimizar' : 'Expandir'} onClick={() => clickExpand()}><span className="material-symbols-outlined">{genericPopUpAnimation != 'pop-up-transaction-expand' ? 'fullscreen_exit' : 'select_window'}</span></div>
                        <div className='close' title='Fechar' onClick={() => closeGenericPopUp()}><span className="material-symbols-outlined">close</span></div>
                    </div>
                </div>
            </div>
            <div className='pop-up-content'>
                <div className='desciption'>{description}</div>
            </div>
        </div>
    )
}