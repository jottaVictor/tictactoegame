'use client'
import React from 'react'
import Core from '@components/match/core'

import { GameProvider } from "@providers/game"
import { ControllerModalProvider } from '@providers/controller-modal'
import ControllerModal from '@components/modal/controller-modal'

export default function Page(){

    return (
        <ControllerModalProvider>
            <GameProvider>
                <ControllerModal></ControllerModal>
                <Core></Core>
            </GameProvider>
        </ControllerModalProvider>
    )
}