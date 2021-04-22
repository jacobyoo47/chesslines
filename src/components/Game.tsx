import React from 'react'
import Board from './Board'
import Infobar from './Infobar'
import Chess from './Chess'
import Tracker from './Tracker'
import { getFenPosition } from './Chess'
import { Grid } from '@material-ui/core'
import FlipBoardButton from './FlipBoardButton'
import { startPos } from '../static/positions'

/**
 * Wrapper for the Board / Infobar. Handles the chessState and click-to-move.
 */
export default function Game(): JSX.Element {
  /**
   * chessState: State of the current chess instance
   * squares - 1D array of pieces that represents board
   * kingPos - [whiteKingPos, blackKingPos]
   * player - current player's turn
   * sourceSelection - pos of currently selected square
   * status - flavor text
   * lastMove - 1D array that shows last move played [sourcePos, destPos]
   * castling - [whiteLong, whiteShort, blackLong, blackShort]
   */

  const [chessState, setChessState] = React.useState(getFenPosition(startPos))
  const [boardFlipped, flipBoard] = React.useState(false)

  /**
   * movesState:
   * moveNameList - List of strings for each move played
   * moveList - List of chessStates for the state at each move played
   * selectedMove - Move currently being displayed on the board
   */
  const [movesState, setMovesState] = React.useState(
    new Tracker({
      moveNameList: new Array<string>(),
      moveList: new Array<Chess>(),
      selectedMove: -1,
    }),
  )

  /**
   * lineState:
   * line - array of strings for each move in the line
   * title - displayed title in infobar
   */
  const [lineState, setLine] = React.useState<
    { line: string[]; title: string } | undefined
  >(undefined)

  const currLine = lineState?.line

  const handleLine = (
    lineState: { line: string[]; title: string },
    startFen: string,
  ) => {
    setChessState(getFenPosition(startFen))
    setLine(lineState)
  }

  const handleSelection = (index: number) => {
    setMovesState(
      new Tracker({
        ...movesState,
        selectedMove: index,
      }),
    )
  }

  const handleFlip = () => {
    flipBoard(!boardFlipped)
  }

  /**
   * Handles click-to-move
   * @param i
   */
  const handleClick = (i: number) => {
    const squares = chessState.getSquares()
    const whiteTurn = chessState.isWhiteTurn()
    console.log(movesState.getMoveList())
    if (chessState.sourceSelection === -1) {
      // No piece currently selected
      if (
        squares[i] === undefined ||
        squares[i]?.player !== chessState.player
      ) {
        setChessState(
          new Chess({
            ...chessState,
            status:
              'Invalid selection. Choose player ' +
              chessState.player +
              ' pieces.',
          }),
        )
      } else {
        setChessState(
          new Chess({
            ...chessState,
            status: 'Choose destination for the selected piece',
            sourceSelection: i,
          }),
        )
      }
    } else if (chessState.sourceSelection > -1) {
      // Piece is already selected
      if (
        squares[i] !== undefined &&
        squares[i]?.player === chessState.player
      ) {
        // Select a different piece
        setChessState(
          new Chess({
            ...chessState,
            status: 'Choose destination for the selected piece',
            sourceSelection: i,
          }),
        )
      } else {
        // Attempt to move piece to destination
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
          // Update fallen pieces with captured piece
          const fallenPieces = chessState.getFallenPieces()
          if (squares[i]) fallenPieces.push(squares[i]!.name)

          const newPlayer = whiteTurn ? 'black' : 'white'
          const captured = squares[i] !== undefined

          // Move piece
          squares[i] = squares[chessState.sourceSelection]

          // Update king position
          let newKingPos = chessState.kingPos
          if (squares[chessState.sourceSelection]?.name === 'K') {
            newKingPos[0] = i
          } else if (squares[chessState.sourceSelection]?.name === 'k') {
            newKingPos[1] = i
          }
          squares[chessState.sourceSelection] = undefined

          // Remove captured pawn in case of en passant
          if (enPassant) {
            const modifier = whiteTurn ? 1 : -1
            squares[i + 8 * modifier] = undefined
          }

          const newCastlingStatus = chessState.handleCastles(
            squares,
            castles,
            currPiece,
            i,
          )

          const checkedEnemyKing = chessState.isCheck(
            squares,
            chessState.isWhiteTurn()
              ? chessState.kingPos[1]
              : chessState.kingPos[0],
            chessState.isWhiteTurn() ? 'black' : 'white',
          )

          // Update moveList
          const currMoveName = chessState.getMoveName(
            currPiece!.name,
            captured,
            newCastlingStatus.dir,
            checkedEnemyKing,
            chessState.sourceSelection,
            i,
          )

          const moveNameList = movesState.getMoveNameList()
          moveNameList.push(currMoveName)

          // Make sure player has played the next correct move (when currLine !== undefined)
          const currentHalfMove = chessState.isWhiteTurn()
            ? chessState.moveNo * 2 - 2
            : chessState.moveNo * 2 - 1
          if (
            currLine === undefined ||
            currLine![currentHalfMove] === currMoveName
          ) {
            // Update chess state
            const newChessState = new Chess({
              sourceSelection: -1,
              squares: squares,
              player: newPlayer,
              status: '',
              kingPos: newKingPos,
              lastMove: [chessState.sourceSelection, i],
              castling: newCastlingStatus.newCastling,
              moveNo: !chessState.isWhiteTurn()
                ? chessState.moveNo + 1
                : chessState.moveNo,
              fallenPieces: fallenPieces,
            })
            setChessState(newChessState)

            // Update moves state
            const newMoveList = movesState.getMoveList()
            newMoveList.push(newChessState)
            setMovesState(
              new Tracker({
                ...movesState,
                moveNameList: moveNameList,
                moveList: newMoveList,
                selectedMove: moveNameList.length - 1,
              }),
            )
          } else {
            setChessState(
              new Chess({
                ...chessState,
                status: 'Incorrect move',
                sourceSelection: -1,
              }),
            )
          }
        } else {
          // Invalid selection
          setChessState(
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
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      wrap="nowrap">
      <FlipBoardButton boardFlipped={boardFlipped} onClick={handleFlip} />
      <Board
        chessState={chessState}
        squareClick={handleClick}
        boardFlipped={boardFlipped}
      />
      <Infobar
        chessState={chessState}
        movesState={movesState}
        lineState={lineState}
        handleLine={handleLine}
        handleSelection={handleSelection}
      />
    </Grid>
  )
}
