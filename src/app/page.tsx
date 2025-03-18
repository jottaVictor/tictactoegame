import React from 'react';
// import Game from '../../public/components/game.js';
import Board from '../components/tictactoe/board'
import { GenericPopUp } from '../components/pop-up/generic'
import { YesNoPopUp } from '../components/pop-up/yes-no'
import { ConfirmPopUp } from '../components/pop-up/confirm'
import { BlushProvider } from '../providers/blush' 
import { GenericPopUpProvider } from '../providers/pop-up';
// import Blush from '../../public/js/components/main'
import './page.css'
import Blush from '../components/blush';

const Page = () => {
    return (
        <>
            {/* <h1>Seja bem-vindo! Este é o seu jogo de Tic Tac Toe!</h1> */}
            {/* <Game/> */}
            <BlushProvider>
                <GenericPopUpProvider>
                        <Blush/>
                        <GenericPopUp description='OlaMundo OlaMundo OlaMundo OlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundo'/>
                        {/* <YesNoPopUp title='Responda' description='Sim ou não?' alwaysExpanded={false} isExpanded={false} timeToClose={500}/> */}
                        <ConfirmPopUp description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'></ConfirmPopUp>
                        <section>
                            <div style = {{ width: '500px', height: '500px'}}>
                                <Board/>
                                {/* sBorders="bg-green-500!" firstToPlay="Y"  */}
                            </div>
                        </section>
                </GenericPopUpProvider>
            </BlushProvider>
        </>
    );
};

//TODO:
/*
- Fazer uma função para mudar o conteúdo do popup
- Fazer outras funções para diferentes estilos de popups
*/

export default Page;