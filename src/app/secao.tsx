import React, { useEffect } from 'react'
import { useControllerModal  } from '../providers/controller-modal';

export default function Secao(){
    const { openBaseModal, openConfirmModal, openYesNoModal } = useControllerModal()
    
    useEffect(() => {
        setTimeout(() => {
            console.log("Tentando");
            openBaseModal('Titulo', 'Description', false, false);
            // openBaseModal();
        }, 1000);

        setTimeout(() => {
            console.log("Tentando");
            openConfirmModal('Titulo', 'Description', () => {}, false, false);
            // openConfirmModal();
        }, 1500);

        setTimeout(() => {
            console.log("Tentando");
            openYesNoModal('Titulo', 'Description', () => {}, () => {}, false, false);
            // openYesNoModal();
        }, 1500);

        setTimeout(() => {
            console.log("Tentando");
            openYesNoModal('Titulo', 'Description', () => {}, () => {}, false, false);
            // openYesNoModal();
        }, 1500);
    }, []);

    return (
        <section>
            <div style = {{ width: '500px', height: '500px'}}>
                {/* <Board/> */}
                {/* sBorders="bg-green-500!" firstToPlay="Y" */}
            </div>
        </section>
    )
}