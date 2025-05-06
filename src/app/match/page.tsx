'use client'
import React from 'react'
import Core from './core'

import { GameProvider } from "@providers/game"

export default function Page(){

    return (
        <GameProvider>
            <Core></Core>
        </GameProvider>
    )
}