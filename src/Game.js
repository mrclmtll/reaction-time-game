import { useEffect, useRef, useState } from "react"

function Game () {

    const [gameActive, setGameActive]           = useState(false);
    const [gameEnded, setGameEnded]             = useState(true);
    const [passedTime, setPassedTime]           = useState(0);
    const [targetVisible, setTargetVisible]     = useState(false);
    const [missClickNotify, setMissClickNotify] = useState(false);
    const [mousePosition, setMousePosition]     = useState({ x: 0, y:0 })

    const intervalRef        = useRef(null)
    const targetButton       = useRef(null)
    const gameStartTimeStamp = useRef(0)
    const missClickCount     = useRef(0)


    async function startGame() {
        setTargetVisible(false)
        let delay = Math.random() * 4 * 1000 // random delay between 0 and 4 seconds (0 and 4000 ms)
        setGameActive(true)
        setGameEnded(false)
        setPassedTime(0) // reset timer
        missClickCount.current = 0

        await new Promise(r => setTimeout(r, delay)) // wait delay seconds

        setTargetVisible(true)

        var date = new Date()
        gameStartTimeStamp.current = date.getTime()  

    }

    function endGame(event) {
        // when button was clicked, do not trigger missclick function
        event.stopPropagation()

        playSound('success')

        var date = new Date()
        var reactionTimeInMs = (date.getTime() - gameStartTimeStamp.current) / 1000
        var timeWithPenalties = reactionTimeInMs + (missClickCount.current * 0.5)
        setPassedTime(timeWithPenalties)
        
        setGameEnded(true)
        clearInterval(intervalRef.current)
        saveHighscore("Name", timeWithPenalties)

    }

    async function saveHighscore(name, score) {
        try {
           const response = await fetch("http://localhost:4000/api/highscores", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, time: score }),
           })

           const data = await response.json();
           console.log("✅ Saved highscore: ", data);
           

        } catch (error) {
            console.error("Error saving highscore")
        }
    }

    function registerMissClick(e) {
        if (!gameEnded) {
            playSound('missclick')
            setPassedTime(prev => prev + 0.5)
            missClickCount.current += 1

            setMousePosition({ x: e.clientX, y: e.clientY })
            // first set to false and then reset, so it can appear even if the timer did not reset
            setMissClickNotify(false)
            setMissClickNotify(true)
        }
        
    }

    function playSound(soundName) {
        const audio = new Audio(`/sounds/${soundName}.mp3`)
        audio.play()
    }

    useEffect(() => {
        if (missClickNotify) {
            setTimeout(() => {
                setMissClickNotify(false)
            }, 1000);
        }
    }, [missClickNotify])

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
                    <span 
                        className="poppins-light timer"
                        data-testid="timer"
                    >
                        {passedTime}sec
                    </span> 
            }
            <div 
                className = "game-area"
                data-testid="gameArea"
                onClick={registerMissClick}
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
                {
                    missClickNotify &&
                        <span 
                            className="poppins-light missclick-notify"
                            style={{
                                position: "absolute",
                                left: mousePosition.x,
                                top: mousePosition.y,
                                color: "red"
                            }}
                        >
                            +0.5sec
                        </span>
                }
            </div>
        </>
    )
}

export default Game
