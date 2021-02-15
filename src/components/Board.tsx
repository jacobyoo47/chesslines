import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Square from './Square'
import Piece from './pieces/Piece'
import { startPos, oneE4, e4c5Nf3 } from '../static/positions'
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
  return num % 2 === 0
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
  const fenList = fen.split(' ')
  const position = fenList[0].split('')
  const reUpper = /[A-Z]/

  let i = 0
  let j = 0
  while (i < 64) {
    const curr = position[j]
    const player = reUpper.test(curr) ? 'white' : 'black'
    switch (curr.toLowerCase()) {
      case 'r': {
        squares[i] = new Rook(player)
        i += 1
        break
      }
      case 'n': {
        squares[i] = new Knight(player)
        i += 1
        break
      }
      case 'b': {
        squares[i] = new Bishop(player)
        i += 1
        break
      }
      case 'k': {
        squares[i] = new King(player)
        i += 1
        break
      }
      case 'q': {
        squares[i] = new Queen(player)
        i += 1
        break
      }
      case 'p': {
        squares[i] = new Pawn(player)
        i += 1
        break
      }
      default: {
        if (curr >= '0' && curr <= '8') {
          i += parseInt(curr)
        }
        break
      }
    }
    j += 1
  }

  return squares
}

function Board(): JSX.Element {
  const classes = useStyles()
  const board = []

  const squares = initializePosition(e4c5Nf3)

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
