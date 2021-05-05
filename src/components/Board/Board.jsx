import React, { useRef, useEffect, useState } from "react";

import Tile from "./Tile";
import playerImg from "../../../static/img/player.png";
import { PLAYER_SIZE, TILES } from "../../constants/";

const Board = ({ position, setPositionHandler, malusHandler, handler }) => {
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
                isTrap:
                    i === TILES - 1
                        ? false
                        : i % 10 > 0
                        ? Math.round(Math.random() * 3) >= 2
                        : false,
            });
        }
        setTilesPositions(positions);
    }, []);

    useEffect(() => {
        if (tilesPositions[position]?.isTrap) {
            const isMsgPositive = +(Math.round(Math.random() * 3) * 3 === 3);
            const malus = isMsgPositive ? 0 : Math.floor(Math.random() * 6) + 3;
            const newPosition = position - malus > 0 ? position - malus : 0;
            setPositionHandler((prevState) => ({
                ...prevState,
                playerPosition: newPosition,
            }));
            malusHandler({ visible: true, isMsgPositive });
        }
    }, [position]);

    const player = (
        <>
            {tilesPositions[playerPosition]?.position && (
                <g className="image-player">
                    <image
                        href={playerImg}
                        height={`${PLAYER_SIZE}px`}
                        width={`${PLAYER_SIZE}px`}
                        x={
                            tilesPositions[playerPosition].position?.x -
                            PLAYER_SIZE / 2 +
                            2
                        }
                        y={
                            tilesPositions[playerPosition].position.y -
                            PLAYER_SIZE / 2 -
                            6
                        }
                    />
                </g>
            )}
        </>
    );

    const tiles = tilesPositions.map((pos, index) => {
        const color = index % 10;
        return <Tile key={`key-${index}`} color={color} pos={pos} />;
    });

    return (
        <div onClick={() => handler()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="board-svg"
                viewBox="140 0 420 480"
                preserveAspectRatio="xMidYMid meet"
            >
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
                        className="selected"
                        filter="url(#f009)"
                    />
                </g>
                {tiles}
                {player}
                <g>
                    <text
                        x="82%"
                        y="50%"
                        textAnchor="middle"
                        filter="url(#f009)"
                        fontSize="1rem"
                    >
                        Klikni ovdje za bacanje kocke
                    </text>
                </g>
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

export { Board };
