import React from 'react'
import Chess from './Chess'
import { getFenPosition } from './Chess'
import { makeStyles } from '@material-ui/core/styles'
import Square from './Square'
import Piece from './pieces/Piece'
import { startPos, oneE4, e4c5Nf3 } from '../static/positions'

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

/**
 * Renders the chessboard and handles the legal move logic.
 */
function Board(): JSX.Element {
  const classes = useStyles()
  const board = []

  /**
   * chessState:
   * squares - 1D array of pieces that represents board
   * kingPos - [whiteKingPos, blackKingPos]
   * player - current player's turn
   * sourceSelection - pos of currently selected square
   * status - flavor text
   * lastMove - 1D array that shows last move played [sourcePos, destPos]
   * castling - [whiteLong, whiteShort, blackLong, blackShort]
   */

  const [chessState, setState] = React.useState(getFenPosition(startPos))

  /**
   * Handles click-to-move
   * @param i
   */
  const handleClick = (i: number) => {
    //console.log(chessState)
    const squares = chessState.getSquares()
    const whiteTurn = chessState.isWhiteTurn()
    // console.log(i)

    if (chessState.sourceSelection === -1) {
      // No piece currently selected
      if (
        squares[i] === undefined ||
        squares[i]?.player !== chessState.player
      ) {
        setState(
          new Chess({
            ...chessState,
            status:
              'Invalid selection. Choose player ' +
              chessState.player +
              ' pieces.',
          }),
        )
      } else {
        setState(
          new Chess({
            ...chessState,
            status: 'Choose destination for the selected piece',
            sourceSelection: i,
          }),
        )
      }
    } else if (chessState.sourceSelection > -1) {
      // Piece selected
      if (
        squares[i] !== undefined &&
        squares[i]?.player === chessState.player
      ) {
        setState(
          new Chess({
            ...chessState,
            status: 'Choose destination for the selected piece',
            sourceSelection: i,
          }),
        )
      } else {
        const isDestEnemyOccupied = squares[i] ? true : false
        const currPiece = squares[chessState.sourceSelection]
        // currPiece should never be undefined, since sourceSelection is a valid piece
        const isMovePossible = currPiece?.isMovePossible(
          chessState.sourceSelection,
          i,
          isDestEnemyOccupied,
        )

        const srcToDestPath = currPiece?.getSrcToDestPath(
          chessState.sourceSelection,
          i,
        )
        const enPassant = chessState.isEnPassant(
          currPiece,
          chessState.sourceSelection,
          i,
        )
        const castles = chessState.isCastles(currPiece, i)

        if (
          srcToDestPath !== undefined &&
          (isMovePossible || enPassant || castles) &&
          chessState.isMoveLegal(srcToDestPath, i, castles)
        ) {
          // if (squares[i]?.player === 'white') {
          //   whiteFallenSoldiers.push(squares[i])
          // } else {
          //   blackFallenSoldiers.push(squares[i])
          // }
          const newPlayer = whiteTurn ? 'black' : 'white'

          // Move piece
          squares[i] = squares[chessState.sourceSelection]

          // Remove captured pawn in case of en passant
          if (enPassant) {
            const modifier = whiteTurn ? 1 : -1
            squares[i + 8 * modifier] = undefined
          }

          const newCastling = chessState.handleCastles(
            squares,
            castles,
            currPiece,
            i,
          )

          // Update king position
          let newKingPos = chessState.kingPos
          if (squares[chessState.sourceSelection]?.name === 'K') {
            newKingPos[0] = i
          } else if (squares[chessState.sourceSelection]?.name === 'k') {
            newKingPos[1] = i
          }
          squares[chessState.sourceSelection] = undefined
          setState(
            new Chess({
              sourceSelection: -1,
              squares: squares,
              player: newPlayer,
              status: '',
              kingPos: newKingPos,
              lastMove: [chessState.sourceSelection, i],
              castling: newCastling,
              moveNo: !chessState.isWhiteTurn()
                ? chessState.moveNo + 1
                : chessState.moveNo,
            }),
          )
        } else {
          setState(
            new Chess({
              ...chessState,
              status:
                'Wrong selection. Choose valid source and destination again.',
              sourceSelection: -1,
            }),
          )
        }
      }
    }
  }

  const currKing = chessState.isWhiteTurn()
    ? chessState.kingPos[0]
    : chessState.kingPos[1]

  // Check if king is in check
  const kingChecked = chessState.isCheck(chessState.squares, currKing)

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
          () => handleClick(coord),
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
      {/* <h5 className={classes.turnText}>{chessState.status}</h5> */}
    </div>
  )
}

export default Board
