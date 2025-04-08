import { useEffect, useRef, useState } from "react"

function Game () {

    const [gameActive, setGameActive]       = useState(false);
    const [gameEnded, setGameEnded]         = useState(true);
    const [passedTime, setPassedTime]       = useState(0);
    const [targetVisible, setTargetVisible] = useState(false);
    const intervalRef                       = useRef(null)
    const targetButton                      = useRef(null)


    async function startGame() {
        setTargetVisible(false)
        let delay = Math.random() * 4 * 1000 // random delay between 0 and 4 seconds (0 and 4000 ms)
        setGameActive(true)
        setGameEnded(false)
        setPassedTime(0) // reset timer

        await new Promise(r => setTimeout(r, delay)) // wait delay seconds

        setTargetVisible(true)


    }

    function endGame() {
        setGameEnded(true)
        clearInterval(intervalRef.current)
    }

    useEffect(() => {
        if (targetButton.current && !gameEnded) {
            let top = Math.random() * 100
            let left = Math.random() * 100
            targetButton.current.style.top = `${top}%`
            targetButton.current.style.left = `${left}%`
        }
    }, [gameEnded, targetVisible]);

    useEffect(() => {
        if (!gameEnded && targetVisible) {
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
    }, [gameEnded, targetVisible]);

    return (
        <>
            <button
                className="start-button poppins-light"
                disabled={!gameEnded} 
                onClick={startGame}
            >
                Start Game
            </button>
            {
                gameActive &&
                    <span className="poppins-light">{passedTime}sec</span> 
            }
            <div 
                className = "game-area"
                data-testid="gameArea"
            >
                {
                    targetVisible &&
                        <button 
                            ref={targetButton}
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
