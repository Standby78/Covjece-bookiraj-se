import React, { useRef, useEffect, useState } from "react";
import playerImg from "../../../static/img/player.png";

const PLAYER_SIZE = 48;
const TILES = 40;
const SCALE = 2;

const Board = ({ position, setPositionHandler }) => {
    const playerPosition = position;

    const [tilesPositions, setTilesPositions] = useState([]);

    const pathRef = useRef();

    useEffect(() => {
        const pathElement = pathRef.current;
        const length = pathElement.getTotalLength();
        const positions = [];
        for (let i = 0; i < TILES; i++) {
            positions.push({
                index: i,
                position: pathElement.getPointAtLength((i / TILES) * length),
                isTrap: Math.round(Math.random() * 2) === 2,
            });
        }
        setTilesPositions(positions);
    }, []);

    useEffect(() => {
        if (tilesPositions[position]?.isTrap) {
            console.log(position)
            const malus = Math.floor(Math.random() * 6) + 3
            const newPosition = position - malus > 0 ? position - malus : 0;
            setPositionHandler(newPosition);
            console.log('you met Goga!', malus, newPosition)
        }
    }, [position])

    const player = (
        <image
            href={playerImg}
            height={`${PLAYER_SIZE}px`}
            width={`${PLAYER_SIZE}px`}
            x={-PLAYER_SIZE / 2}
            y={-PLAYER_SIZE / 2}
            style={{
                transform: `translate(${
                    tilesPositions[playerPosition]?.position.x * SCALE
                }px, ${tilesPositions[playerPosition]?.position.y * SCALE}px)`,
            }}
        />
    );

    const tiles = tilesPositions.map((pos, index) => {
        const color = index % 10;
        return (
            <g
                style={{
                    transform: `translate(${pos.position.x * SCALE}px, ${
                        pos.position.y * SCALE
                    }px)`,
                }}
            >
                <circle
                    key={`tile-${index}`}
                    cx="0"
                    cy="0"
                    r="25"
                    stroke="black"
                    strokeWidth="3"
                    fill={color === 0 ? "green" : "red"}
                    filter="url(#f009)"
                ></circle>
                {color === 0 && (
                    <text
                        x="0"
                        y=".5%"
                        textAnchor="middle"
                        filter="url(#f009)"
                        fontSize=".75em"
                    >
                        START
                    </text>
                )}
                {color !== 0 && pos.isTrap && (
                    <text
                        x="0"
                        y="2%"
                        textAnchor="middle"
                        filter="url(#f009)"
                        fontSize="2.5em"
                    >
                        ?
                    </text>
                )}
            </g>
        );
    });

    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "60vw", height: "95vh" }}
            >
                <rect
                    id="backgroundrect"
                    width="100%"
                    height="100%"
                    x="0"
                    y="0"
                    fill="#FFFFFF"
                    stroke="none"
                />
                <g className="currentLayer">
                    <path
                        ref={pathRef}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeDashoffset=""
                        fillRule="nonzero"
                        id="table"
                        d="M162.59847251940312,194.64391572599746 L286.9589477833953,194.64391572599746 L286.9589477833953,70.28342819763031 L404.0274898635448,70.28342819763031 L404.0274898635448,194.64391572599746 L528.3879160700096,194.64391572599746 L528.3879160700096,311.7124578061384 L404.0274898635448,311.7124578061384 L404.0274898635448,436.0728840126194 L286.9589477833953,436.0728840126194 L286.9589477833953,311.7124578061384 L162.59847251940312,311.7124578061384 L162.59847251940312,194.64391572599746 z"
                        style={{ transform: `scale(${SCALE})` }}
                        className="selected"
                        filter="url(#f009)"
                    />
                </g>
                {tiles}
                {player}
                <defs>
                    <filter id="f009">
                        <feTurbulence
                            numOctaves="3"
                            seed="0"
                            type="turbulence"
                            baseFrequency=".04"
                            result="result91"
                        />
                        <feDisplacementMap
                            scale="6.6"
                            yChannelSelector="G"
                            xChannelSelector="R"
                            in="SourceGraphic"
                            in2="result91"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Board;
