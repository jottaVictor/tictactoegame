'use client';
// import './generic.css'
import './confirm.css'
import '../../css/index.css'
// import React, { useEffect, useState } from 'react'
// import { useBlush } from '../../providers/blush';
import React, { memo } from 'react'
import { BaseModal, BaseHead, BaseDescription } from './base-modal'

// export default function Confirm(
//     {
//         title = 'Alerta!',
//         description='',
//         alwaysExpanded=false,
//         isExpanded: defaultExpanded=false,
//         timeToClose=5000
//     }
// ){
//     const {showBlush, hideBlush} = useBlush()
//     const [isActive, setIsActive] = useState(true)
//     const [isExpanded, setIsExpanded] = useState(defaultExpanded)

//     useEffect(
//         () => {
//             console.log("A popup was active")
//         }
//     , [isActive])

//     const hidePopUp = () => {
//         setIsActive(false)
//         console.log("The generic popUp was hidden")
//     }

//     const expandPopUp = () => {
//         setIsExpanded(true)
//     }

//     const minimizePopUp = () => {
//         setIsExpanded(false)
//     }

//     const closePopUp = () => {
//         hidePopUp()
//     }

//     function clickExpand(){
//         if(alwaysExpanded)
//             return

//         if(isExpanded)
//             minimizePopUp()
//         else
//             expandPopUp()
//     }

//     useEffect(
//         () => {
//             if(isExpanded)
//                 showBlush()
//             else
//                 hideBlush()
//         }
//     , [isExpanded])

//     useEffect(
//         () => {
//             if(isActive && alwaysExpanded){
//                 return expandPopUp()
//             }
//             if(!isActive)
//                 hideBlush()
//         }
//     , [isActive])


//     function okFunc(){
//         closePopUp()
//     }
    
//     function copyDescription(){
//         navigator.clipboard.writeText(`Titulo: ${title}\nDescription: ${description}`)
//     }

//     return (
//         <div className={`modal ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
//             <div className='pop-up-head'>
//                 <div className='grid grid-cols-10 overflow-visible!'>
//                     <div className='col-span-8 title'><i className="material-symbols-outlined">question_mark </i><label>{title}</label></div>
//                     <div className='col-span-2 actions pr-2'>
//                         <div className='copy' title='Copiar conteúdo' onClick={() => copyDescription()}><i className="material-symbols-outlined">content_copy</i></div>
//                         <div className='close' title='Fechar' onClick={() => closePopUp()}><i className="material-symbols-outlined">close</i></div>
//                     </div>
//                 </div>
//             </div>
//             <div className={`pop-up-content ${isExpanded ? 'expanded' : ''}`} title={isExpanded ? 'Clique para minimizar' : 'Clique para ver mais'} onClick={() => clickExpand()}>
//                 <div className='description'>{description}</div>
//             </div>
//             <div className='pop-up-footer'>
//                 <div className='box-option' onClick={() => okFunc()}>
//                     <span className='ok-botton' title='OK'>OK</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default function Confirm({id, title = 'Confirmação', description = '', confirmFunc = () => {}, isExpanded = true, alwaysExpanded = false}){
    const Footer = React.memo((props) => {
        const clickOk = () => {
            props.confirmFunc()
            props.closeModal()
        }

        return (
            <div className='box-option' onClick={() => clickOk()}>
                <span className='ok-botton' title='OK'>OK</span>
            </div>
        )
    })

    return (
        <BaseModal Head={BaseHead} Content={BaseDescription} Footer={Footer} title={title} description={description} isExpanded={isExpanded} alwaysExpanded={alwaysExpanded} confirmFunc={confirmFunc} type='confirm' id={id}/>
    )
}

