import { useEffect, useRef, useState } from "react"

function Game () {

    function startGame() {
        setPassedTime(0) // reset timer
        setGameActive(true)
        setGameEnded(false)

    }
    function endGame() {
        setGameEnded(true)
        clearInterval(intervalRef.current)
    }

    const [gameActive, setGameActive] = useState(false);
    const [gameEnded, setGameEnded]   = useState(true);
    const [passedTime, setPassedTime] = useState(0);
    const intervalRef = useRef(null)

    useEffect(() => {
        if (!gameEnded) {
            intervalRef.current = setInterval(() => {
                setPassedTime(prev => Math.round((prev + 0.01) * 10000) / 10000);
            }, 10)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [gameEnded]);

    return (
        <>
            <button disabled={!gameEnded} onClick={startGame}>Start Game</button>
            {gameActive ? <span>{passedTime}sec</span> : <></>}
            <div style={{borderStyle: "solid", borderWidth: "5px", borderColor:"#101010", height:"50vh", width:"50vw"}} data-testid="gameArea">
                {gameActive ? <button data-testid="target" onClick={endGame} style={{borderRadius: "100%", height: "5vw", width: "5vw"}}></button> : <></>}
            </div>
        </>
    )
}

export default Game
