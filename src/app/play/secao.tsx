import React, { useEffect } from 'react'
import { useControllerModal  } from '../../providers/controller-modal';
import Board from '@components/tictactoe/board'

export default function Secao(){
    const { openBaseModal, openConfirmModal, openYesNoModal } = useControllerModal()
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         openBaseModal('Titulo', 'Description', false, false);
    //         // openBaseModal();
    //     }, 1000);

    //     setTimeout(() => {
    //         openConfirmModal('Titulo', 'Description', () => {}, false, false);
    //         // openConfirmModal();
    //     }, 1500);

    //     setTimeout(() => {
    //         openYesNoModal('Titulo', 'Description', () => {}, () => {}, false, false);
    //         // openYesNoModal();
    //     }, 1500);

    //     setTimeout(() => {
    //         openYesNoModal('Titulo', 'Description', () => {}, () => {}, false, false);
    //         // openYesNoModal();
    //     }, 1500);
    // }, []);

    return (
        <section>
            <div style = {{ width: '500px', height: '500px'}}>
                <Board mode='playerxsocket'/>
                {/* <Board mode='playerxplayer'/> */}
                {/* sBorders="bg-green-500!" firstToPlay="Y" */}
            </div>
        </section>
    )
}