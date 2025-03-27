'use client'
import React from 'react'
import { YesNo, Confirm, BaseModal } from '@components/modal'
import { useControllerModal } from '@providers/controller-modal'

export default function ControllerModal(){
    const { activeModals } = useControllerModal()
    const typeModals = { base: BaseModal, yesNo: YesNo, confirm: Confirm, }

    return (
        <div id='controllerModal'>
            {activeModals.map((modal, index) => {
                const Modal = typeModals[modal.type] || null
                
                if (!Modal) return null
                let top  = `calc(20px + ${index} * 5em)`

                return (
                    <Modal
                        key={modal.id}
                        {...modal}
                        style = {
                            {
                                top: top
                            }
                        }
                    />
                )
            })}
        </div>
    )
}