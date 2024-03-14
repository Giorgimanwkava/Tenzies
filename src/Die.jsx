import React from "react"
import "./Die.css"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const dotPositionMatrix = {
        1:[
            [50,50]
        ],
        2:[
            [20,20],
            [80,80]
        ],
        3:[
            [20,20],
            [50,50],
            [80,80]
        ],
        4:[
            [20,20],
            [20,80],
            [80,20],
            [80,80]
        ],
        5:[
            [20,20],
            [20,80],
            [50,50],
            [80,20],
            [80,80]
        ],
        6:[
            [20,20],
            [20,80],
            [50,20],
            [50,80],
            [80,20],
            [80,80]
        ]
    }
    
    const dots = dotPositionMatrix[props.value].map((position, index) => {
        return (
            <div 
                key={index}
                className="die-dot"
                style={{ top: `${position[0]}%`, left: `${position[1]}%` }}
            ></div>
        );
    });
    
    return (
        <div 
            className="die-face"
            id={`die-${props.value}`}
            style={styles}
            onClick={props.holdDice}
        >
            {dots}
        </div>
    )
}