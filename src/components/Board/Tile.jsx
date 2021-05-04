import React from "react";

const Tile = ({ pos, color }) => (
    <g className="g-tiles">
        <circle
            cx={pos.position.x}
            cy={pos.position.y}
            r="15"
            stroke="black"
            strokeWidth="3"
            fill={color === 0 ? "green" : "red"}
            filter="url(#f009)"
        ></circle>
        {color === 0 && (
            <text
                x={pos.position.x}
                y={pos.position.y + 4}
                textAnchor="middle"
                filter="url(#f009)"
                fontSize=".5em"
            >
                START
            </text>
        )}
        {color !== 0 && pos.isTrap && (
            <text
                className="trap"
                x={pos.position.x}
                y={pos.position.y + 6}
                textAnchor="middle"
                filter="url(#f009)"
                fontSize="1em"
            >
                ?
            </text>
        )}
    </g>
);

export default Tile;
