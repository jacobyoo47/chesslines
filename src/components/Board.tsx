import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Square from './Square'
import Piece from './pieces/Piece'
import { startPos } from '../static/positions'
import { render } from '@testing-library/react'
import King from './pieces/King'
import Queen from './pieces/Queen'
import Bishop from './pieces/Bishop'
import Knight from './pieces/Knight'
import Rook from './pieces/Rook'
import Pawn from './pieces/Pawn'

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.info.main,
    fontSize: 12,
  },
}))

function isEven(num: number): boolean {
  return num % 2 == 0
}

function renderSquare(
  squares: Array<Piece>,
  isLight: boolean,
  position: number,
): JSX.Element {
  return <Square isLight={isLight} piece={squares[position]} />
}

const initializePosition = (fen: string): Array<Piece> => {
  const squares = Array(64).fill(null)

  for (let i = 8; i < 16; i++) {
    squares[i] = new Pawn('black')
    squares[i+40] = new Pawn('white')
  }

  squares[0] = new Rook('black')
  squares[1] = new Knight('black')
  squares[2] = new Bishop('black')
  squares[3] = new Queen('black')
  squares[4] = new King('black')
  squares[5] = new Bishop('black')
  squares[6] = new Knight('black')
  squares[7] = new Rook('black')

  squares[56] = new Rook('white')
  squares[57] = new Knight('white')
  squares[58] = new Bishop('white')
  squares[59] = new Queen('white')
  squares[60] = new King('white')
  squares[61] = new Bishop('white')
  squares[62] = new Knight('white')
  squares[63] = new Rook('white')

  return squares
}

function Board(): JSX.Element {
  const classes = useStyles()
  const board = []

  const squares = initializePosition('')

  for (let i = 0; i < 8; i++) {
    const squareRows = []

    for (let j = 0; j < 8; j++) {
      const squareIsLight =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? true : false
      squareRows.push(renderSquare(squares, squareIsLight, i * 8 + j))
    }

    board.push(<div className="board-row">{squareRows}</div>)
  }

  return <div className={classes.root}>{board}</div>
}

export default Board
