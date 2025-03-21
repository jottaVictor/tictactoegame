// 'use client'
// import React, { createContext, useContext, useState } from 'react';
// import Confirm from 'ConfirmPopUp'
// import GenericPopUp from '../components/pop-up/generic';
// import { YesNoPopUp } from '../components/pop-up/yes-no';

// const GenericPopUpContext = createContext({
//     showGenericPopUp: () => {},
//     hideGenericPopUp: () => {},
//     expandGenericPopUp: () => {},
//     minimizeGenericPopUp: () => {},
//     closeGenericPopUp: () => {},
//     isActive: false,
//     isExpanded: false
// });

// export const GenericPopUpProvider = ({ children }) => {
//     const listModal = useState([])
//     const confirmModal = ''

//     const showGenericPopUp = () => {
//         setIsActive(true)
//         console.log("The generic popUp was showed")
//     }

//     const hideGenericPopUp = () => {
//         setIsActive(false)
//         console.log("The generic popUp was hidden")
//     }

//     const expandGenericPopUp = () => {
//         setIsExpanded(true)
//         showBlush()
//     }

//     const minimizeGenericPopUp = () => {
//         setIsExpanded(false)
//         hideBlush()
//     }

//     const closeGenericPopUp = () => {
//         hideGenericPopUp()
//         hideBlush()
//     }

//     return (
//         <GenericPopUpContext.Provider value={{ showGenericPopUp, hideGenericPopUp, expandGenericPopUp, minimizeGenericPopUp, closeGenericPopUp, isExpanded, isActive }}>
//             {children}
//         </GenericPopUpContext.Provider>
//     );
// };

// export const useGenericPopUp = () => useContext(ControllerModalContext)