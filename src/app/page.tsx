'use client'
import React from 'react';
import './page.css'
import { BlurProvider } from '@providers/blur' 
import Blur from '../components/blur'
import { ControllerModalProvider } from '@providers/controller-modal'
import ControllerModal from '@components/modal/controller-modal'
import Board from '@components/tictactoe/board'
import Secao from './secao'
import Game from '../components/tictactoe/gameLogic/game';

export default function Page(){
    return (
        <>
            {/* <h1>Seja bem-vindo! Este é o seu jogo de Tic Tac Toe!</h1> */}
            {/* <Game/> */}
            <BlurProvider>
                    <Blur/>
                    <ControllerModalProvider>
                        <ControllerModal/>
                        {/* <GenericPopUp description='OlaMundo OlaMundo OlaMundo OlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundo'/> */}
                        {/* <YesNo description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/> */}
                        {/* <Confirm description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/> */}
                        {/* <BaseModal description='aaaa' alwaysExpanded={false}/> */}
                        <Secao/>
                    </ControllerModalProvider>
            </BlurProvider>
        </>
    );
};

//TODO:
/*

- Substituir valor por data em GenrericReturn

GAME
- websocket
- Após a centralização dos tipos de compentes, tratar o exception
*/