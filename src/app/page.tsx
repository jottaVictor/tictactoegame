'use client'
import React, { useEffect } from 'react';
// import Game from '../../public/components/game.js';
import Board from '../components/tictactoe/board'
import Confirm from '../components/modal/confirm'
import YesNo from '../components/modal/yes-no'
import ControllerModal from '../components/modal/controller-modal'
import { BlurProvider } from '../providers/blur' 
import './page.css'
import Blur from '../components/blur';
import { ControllerModalProvider } from '../providers/controller-modal';
import { BaseModal } from '../components/modal/base-modal';
import { describe } from 'node:test';
import Secao from './secao'

const Page = () => {
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

- Criar path alias pra facilitar as importações

POPUP
- Mudar o nome dos popups para modal *
- Componentizar melhor tipos de modal (está sendo repetido algumas estruturas)
- componente para a exibição dos modal !!!

GAME
- websocket
- Após a centralização dos tipos de compentes, tratar o exception
*/

export default Page;