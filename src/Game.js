import { useEffect, useRef, useState } from "react"

function Game () {

    const [gameActive, setGameActive] = useState(false);
    const [gameEnded, setGameEnded]   = useState(true);
    const [passedTime, setPassedTime] = useState(0);
    const intervalRef = useRef(null)


    function startGame() {
        setPassedTime(0) // reset timer
        setGameActive(true)
        setGameEnded(false)

    }
    function endGame() {
        setGameEnded(true)
        clearInterval(intervalRef.current)
    }


    useEffect(() => {
        if (!gameEnded) {
            intervalRef.current = setInterval(() => {
                setPassedTime(
                    prev => 
                        Math.round((prev + 0.01) * 10000) / 10000  // round it to 2 decimals
                );
            }, 10)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [gameEnded]);

    return (
        <>
            <button
                disabled={!gameEnded} 
                onClick={startGame}
            >
                Start Game
            </button>
            {
                gameActive &&
                    <span>{passedTime}sec</span> 
            }
            <div 
                className = "game-area"
                data-testid="gameArea"
            >
                {
                    gameActive &&
                        <button 
                            data-testid="target" 
                            onClick={endGame} 
                            className="target-button"
                        ></button> 
                }
            </div>
        </>
    )
}

export default Game
