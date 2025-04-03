import { useState } from "react"

function Game () {

    function startGame() {
        setGameActive(prev => !prev)
    }
    const [gameActive, setGameActive] = useState(false);
    const [passedTime, setPassedTime] = useState(0)
    return (
        <>
            <button disabled={gameActive} onClick={startGame}>Start Game</button>
            {gameActive ? <span>{passedTime}sec</span> : <></>}
            <div style={{borderStyle: "solid", borderWidth: "5px", borderColor:"#101010", height:"50vh", width:"50vw"}} data-testid="gameArea">

            </div>
        </>
    )
}

export default Game
