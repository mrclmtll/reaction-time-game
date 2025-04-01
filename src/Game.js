import { useState } from "react"

function Game () {

    function toggleGame() {
        setGameActive(prev => !prev)
    }
    const [gameActive, setGameActive] = useState(false);
    return (
        <>
            <button disabled={gameActive} onClick={toggleGame}>Start Game</button>
        </>
    )
}

export default Game
