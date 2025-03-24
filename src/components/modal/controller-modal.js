'use client'
import React, { useState } from 'react'
import { useControllerModal } from '../../providers/controller-modal'
import YesNo from './yes-no'
import Confirm from './confirm'
import { BaseModal } from './base-modal'

export default function ControllerModal(){
    const { activeModals } = useControllerModal()
    const typeModals = { base: BaseModal, yesNo: YesNo, confirm: Confirm, }

    return (
        <div id='controllerModal'>
            {activeModals.map((modal, index) => {
                const Modal = typeModals[modal.type] || null
                
                if (!Modal) return null 

                const verticalOffset = modal.isExpanded ? 0 : 20 + index * 70

                return (
                    <Modal
                        key={modal.id}
                        {...modal}
                    />
                )
            })}
        </div>
    )
}