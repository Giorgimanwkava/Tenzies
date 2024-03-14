import React from "react"
import "./Indicators.css"

export default function Indicators(props){
    return(    
        <div className="current-run-indicator">
            <div className="count-indicator">
                <h1>Current rolls: {props.rollCount}</h1>
            </div>
            <div className="timer">
                <h1>Time: {props.time}</h1>
            </div>
        </div>
    )
}
