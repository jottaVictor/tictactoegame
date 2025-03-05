import React, {useState, useEffect} from 'react';


function MessageResating(){
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        if(seconds == 0){
            clearInterval(interval);
            console.log("O jogo será resetado!");
        }

        return () => {clearInterval(interval)}
    }, [seconds]);

    return (
        <h1>Um novo jogo será criado em: {seconds}</h1>
    );
}


export default MessageResating;