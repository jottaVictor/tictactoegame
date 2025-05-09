'use client'
import React from 'react'
import Core from '@components/match/core'

import { GameProvider } from "@providers/game"
import { ControllerModalProvider } from '@providers/controller-modal'
import ControllerModal from '@components/modal/controller-modal'
import Blur from '@components/blur'

export default function Page(){

    return (
        <ControllerModalProvider>
            <Blur></Blur>
            <GameProvider>
                <ControllerModal></ControllerModal>
                <Core></Core>
            </GameProvider>
        </ControllerModalProvider>
    )
}