import React from "react"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import Die from "./Die"
import Indicators from "./Indicators"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [gameStarted, setGameStarted] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    React.useEffect(()=>{
        
        const interval = setInterval(() => {
            if(gameStarted){
                setTime(prevSeconds => prevSeconds + 1)
            }
        }, 1000);

        if(tenzies){
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    },[tenzies, gameStarted])

    function startGame(){
        setGameStarted(true)
    }
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount(prevCount=>prevCount+1)
            if(!gameStarted){
                startGame()
            }
        } else {
            setTenzies(false)
            setRollCount(0)
            setTime(0)
            setGameStarted(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
        if(!gameStarted){
            startGame()
        }
    }

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))
    

    //////////////////////local storage


    
    return (
        <main>
            {!tenzies && <Indicators rollCount={rollCount} time={time} />}
            <div className="game-container">
                {tenzies && <Confetti />}
                {!tenzies ? <div className="instructions-and-dice">
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value.</p>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                </div> 
                : <h1>You won with {rollCount} rolls in {time} seconds</h1>}
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div>
        </main>
    )
}