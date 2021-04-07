import React from 'react'
import Chess from './Chess'
import { makeStyles } from '@material-ui/core/styles'
import Square from './Square'
import Piece from './pieces/Piece'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.info.main,
    justifyContent: 'flex-start',
  },
  turnText: {
    fontSize: 24,
    padding: '.5em',
    margin: 0,
  },
  rowText: {
    color: 'red',
    fontSize: '1vw',
    width: '1vw',
    float: 'left',
    paddingRight: '.3vw',
    margin: 0,
  },
  colText: {
    color: 'red',
    fontSize: '1vw',
    width: '1vw',
    height: '1vw',
    margin: 0,
  },
  colTextWrapper: {
    justifyContent: 'space-between',
  },
}))

function isEven(num: number): boolean {
  return num % 2 === 0
}

function renderSquare(
  piece: Piece | undefined,
  isLight: boolean,
  isChecked: boolean,
  isLastMove: boolean,
  isBoardFlipped: boolean,
  sourceSelection: number,
  position: number,
  player: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
): JSX.Element {
  return (
    <Square
      isLight={isLight}
      isSelected={sourceSelection === position}
      isChecked={isChecked}
      isLastMove={isLastMove}
      isBoardFlipped={isBoardFlipped}
      piece={piece}
      currPlayer={player}
      coord={position}
      onClick={onClick}
    />
  )
}

interface boardProps {
  chessState: Chess
  squareClick: any
  boardFlipped: boolean
}

/**
 * Renders the chessboard.
 */
function Board({
  chessState,
  squareClick,
  boardFlipped,
}: boardProps): JSX.Element {
  const board = []

  const classes = useStyles()

  function renderText(position: number, column: boolean): JSX.Element {
    // Calculate inverse square color
    const i = Math.floor(position / 8)
    const j = position % 8
    const inverseSquareColor =
      (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
        ? '#BC6C25'
        : '#DDA15E'
    if (!column) {
      const row = 8 - i
      const text = row.toString()
      return (
        <p style={{ color: inverseSquareColor }} className={classes.rowText}>
          {text}
        </p>
      )
    } else {
      // When board is flipped, columns should also be flipped
      const col = boardFlipped ? 7 - j : j
      const text = String.fromCharCode(97 + col)
      return (
        <span style={{ color: inverseSquareColor }} className={classes.colText}>
          {text}
        </span>
      )
    }
  }

  const currKing = chessState.isWhiteTurn()
    ? chessState.kingPos[0]
    : chessState.kingPos[1]

  // Check if king is in check
  const kingChecked = chessState.isCheck(
    chessState.squares,
    currKing,
    chessState.player,
  )

  // Render 8x8 board
  let start, end, incr
  if (!boardFlipped) {
    start = 0
    end = 8
    incr = 1
  } else {
    start = 7
    end = -1
    incr = -1
  }
  for (let i = start; i !== end; i += incr) {
    const squareRows = []

    for (let j: number = start; j !== end; j += incr) {
      const squareIsLight =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? true : false
      const coord = i * 8 + j
      const checkSquare = coord === currKing && kingChecked // highlight checked king square red
      const isLastMoveSquare = chessState.lastMove.includes(coord)
      // Add row text
      if (j === start) {
        squareRows.push(renderText(coord, false))
      }
      squareRows.push(
        renderSquare(
          chessState.squares[coord],
          squareIsLight,
          checkSquare,
          isLastMoveSquare,
          boardFlipped,
          chessState.sourceSelection,
          coord,
          chessState.player,
          () => squareClick(coord),
        ),
      )
    }

    board.push(<div className="board-row">{squareRows}</div>)
  }
  // Add col text
  const colTextRow = []
  colTextRow.push(
    <span style={{ paddingRight: '.3vw' }} className={classes.colText}></span>,
  )
  for (let i = 0; i < 8; i++) {
    const coord = boardFlipped ? i : 56 + i
    colTextRow.push(renderText(coord, true))
  }
  board.push(
    <Grid container className={classes.colTextWrapper}>
      {colTextRow}
    </Grid>,
  )

  return (
    <div>
      <div className={classes.root}>{board}</div>
    </div>
  )
}

export default Board
