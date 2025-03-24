import React, { useEffect } from 'react'
import { useControllerModal  } from '../providers/controller-modal';

export default function Secao(){
    const { openBaseModal, openConfirmModal } = useControllerModal()
    
    useEffect(() => {
        setTimeout(() => {
            console.log("Tentando");
            openBaseModal('Titulo', 'Description', false, false);
        }, 1000);

        setTimeout(() => {
            console.log("Tentando");
            openConfirmModal('Titulo', 'Description', () => {}, false, false);
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