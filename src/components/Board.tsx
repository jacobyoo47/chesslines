import React from 'react'
import Chess from './Chess'
import { makeStyles } from '@material-ui/core/styles'
import Square from './Square'
import Piece from './pieces/Piece'

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.info.main,
    display: 'flex',
    justifyContent: 'center',
  },
  turnText: {
    fontSize: 24,
    padding: '.5em',
    margin: 0,
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
}

/**
 * Renders the chessboard.
 */
function Board({chessState, squareClick}: boardProps): JSX.Element {
  const board = []

  const classes = useStyles()

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
  for (let i = 0; i < 8; i++) {
    const squareRows = []

    for (let j = 0; j < 8; j++) {
      const squareIsLight =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? true : false
      const coord = i * 8 + j
      const checkSquare = coord === currKing && kingChecked // highlight checked king square red
      const isLastMoveSquare = chessState.lastMove.includes(coord)
      squareRows.push(
        renderSquare(
          chessState.squares[coord],
          squareIsLight,
          checkSquare,
          isLastMoveSquare,
          chessState.sourceSelection,
          coord,
          chessState.player,
          () => squareClick(coord),
        ),
      )
    }

    board.push(<div className="board-row">{squareRows}</div>)
  }

  return (
    <div>
      <div className={classes.root}>
        <div>{board}</div>
      </div>
      <h4 className={classes.turnText} style={{ color: chessState.player }}>
        {chessState.player} to move
      </h4>
    </div>
  )
}

export default Board
