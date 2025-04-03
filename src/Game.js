import { useState } from "react"

function Game () {

    function startGame() {
        setGameActive(true)
        setGameEnded(false)
    }
    function endGame() {
        setGameEnded(true)
    }
    const [gameActive, setGameActive] = useState(false);
    const [gameEnded, setGameEnded]   = useState(true);
    const [passedTime, setPassedTime] = useState(0)
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
