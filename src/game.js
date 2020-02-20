import React from 'react';

export default function Game(props) {
    return ( 
        <div className="game-results">
            <p>Game: {props.App}</p>
            <p>Rating: {props.Rating}</p>
        </div>
    );
};