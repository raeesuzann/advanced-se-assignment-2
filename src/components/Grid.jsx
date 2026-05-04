import React from 'react'
import Square from './Square'

const Grid = ({squares, onClick}) => {
    return (
        <div
        role='grid'
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gap: '4px',
        }}
        >
        {squares.map((value, index) => (
            <Square
            key={index}
            value={value}
            onClick={() => onClick(index)}
            />
        ))}
        </div>

    )
}

export default Grid
