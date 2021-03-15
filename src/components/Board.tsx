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

const initializePosition = (
  fen: string,
  state: {
    squares: (Piece | undefined)[]
    kingPos: Array<number>
    player: string
    sourceSelection: number
    status: string
    lastMove: Array<number>
  },
  setState: React.Dispatch<
    React.SetStateAction<{
      squares: (Piece | undefined)[]
      kingPos: Array<number>
      player: string
      sourceSelection: number
      status: string
      lastMove: Array<number>
    }>
  >,
): Array<Piece | undefined> => {
  console.log('initializing position')
  const squares = Array<Piece | undefined>(64).fill(undefined)
  const fenList = fen.split(' ')
  const position = fenList[0].split('')
  const reUpper = /[A-Z]/
  let wKing = 0
  let bKing = 0

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
        if (player === 'white') {
          wKing = i
        } else {
          bKing = i
        }
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

  setState({ ...state, squares: squares, kingPos: [wKing, bKing] })
  return squares
}

/**
 * Renders the chessboard and handles the legal move logic.
 */
function Board(): JSX.Element {
  const classes = useStyles()
  const board = []

  const [state, setState] = React.useState({
    squares: new Array<Piece | undefined>(),
    kingPos: [0, 0],
    player: 'white',
    sourceSelection: -1,
    status: 'default',
    lastMove: new Array<number>(),
  })

  React.useEffect(() => {
    initializePosition(startPos, state, setState)
  }, [])

  /**
   * Check all path indices are undefined. For one steps move of pawn/others or jumping moves of knight array is empty, so move is legal.
   * @param  {[number]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  const isMoveClear = (
    squares: Array<Piece | undefined>,
    srcToDestPath: number[],
  ) => {
    // Check for pieces blocking path
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (squares[srcToDestPath[i]] !== undefined) {
        return false
      }
    }
    return true
  }

  const isCheck = (squares: Array<Piece | undefined>, kingPos: number) => {
    let res = false
    squares.forEach((p, i) => {
      if (p && p.player !== state.player) {
        if (
          p.isMovePossible(i, kingPos, true) &&
          isMoveClear(squares, p.getSrcToDestPath(i, kingPos))
        ) {
          console.log('found')
          console.log(p.getSrcToDestPath(i, kingPos))
          res = true
        }
      }
    })
    return res
  }

  const inRange = (x: number, y: number, i: number) => {
    return i >= x && i <= y
  }

  const isEnPassant = (piece: Piece | undefined, pos: number, dest: number) => {
    if (piece?.name.toLowerCase() !== 'p') {
      return false
    }
    const p = state.player === 'white' ? 1 : -1
    const enemyPawn = state.squares[dest + 8 * p]
    const enemyColor = state.player === 'white' ? 'p' : 'P'
    const pJump = state.player === 'white' ? 0 : 40
    console.log(inRange(8 + pJump, 15 + pJump, state.lastMove[0]))
    console.log(state.lastMove[0] === state.lastMove[1] - 16 * p)
    const enemyJumped =
      inRange(8 + pJump, 15 + pJump, state.lastMove[0]) &&
      state.lastMove[0] === state.lastMove[1] - 16 * p

    if (
      (dest === pos - 9 * p || dest === pos - 7 * p) &&
      enemyPawn?.name === enemyColor &&
      enemyJumped
    ) {
      return true
    }

    return false
  }

  /**
   * Check that move is not blocked (isMoveClear) and does not put own king in check.
   */
  const isMoveLegal = (srcToDestPath: number[], dest: number) => {
    let isLegal = isMoveClear(state.squares, srcToDestPath)

    // Check for checks -- simulate move
    const checkSquares = state.squares.slice()
    // Temporarily change state.kingPos if we're moving the king
    let tempKingPos
    if (checkSquares[state.sourceSelection]?.name.toLowerCase() === 'k') {
      tempKingPos = dest
    } else {
      tempKingPos =
        state.player === 'white' ? state.kingPos[0] : state.kingPos[1]
    }
    checkSquares[dest] = checkSquares[state.sourceSelection]
    checkSquares[state.sourceSelection] = undefined

    if (isCheck(checkSquares, tempKingPos)) {
      console.log('cant move due to check')
      isLegal = false
    }
    return isLegal
  }

  /**
   * Handles click-to-move
   * @param i
   */
  const handleClick = (i: number) => {
    //console.log(state)
    const squares = state.squares.slice()
    // console.log(i)

    if (state.sourceSelection === -1) {
      // No piece currently selected
      if (squares[i] === undefined || squares[i]?.player !== state.player) {
        setState({
          ...state,
          status:
            'Invalid selection. Choose player ' + state.player + ' pieces.',
        })
      } else {
        setState({
          ...state,
          status: 'Choose destination for the selected piece',
          sourceSelection: i,
        })
      }
    } else if (state.sourceSelection > -1) {
      // Piece selected
      if (squares[i] !== undefined && squares[i]?.player === state.player) {
        setState({
          ...state,
          status: 'Choose destination for the selected piece',
          sourceSelection: i,
        })
      } else {
        const isDestEnemyOccupied = squares[i] ? true : false
        const currPiece = squares[state.sourceSelection]
        // currPiece should never be undefined, since sourceSelection is a valid piece
        const isMovePossible = currPiece?.isMovePossible(
          state.sourceSelection,
          i,
          isDestEnemyOccupied,
        )

        const srcToDestPath = squares[state.sourceSelection]?.getSrcToDestPath(
          state.sourceSelection,
          i,
        )
        const enPassant = isEnPassant(currPiece, state.sourceSelection, i)

        if (
          srcToDestPath !== undefined &&
          (isMovePossible || enPassant) &&
          isMoveLegal(srcToDestPath, i)
        ) {
          // if (squares[i]?.player === 'white') {
          //   whiteFallenSoldiers.push(squares[i])
          // } else {
          //   blackFallenSoldiers.push(squares[i])
          // }
          const newPlayer = state.player === 'white' ? 'black' : 'white'

          // Move piece
          squares[i] = squares[state.sourceSelection]

          // Remove captured pawn in case of en passant
          if (enPassant) {
            const modifier = state.player === 'white' ? 1 : -1
            squares[i + 8 * modifier] = undefined
          }

          // Update king position
          let newKingPos = state.kingPos
          if (squares[state.sourceSelection]?.name === 'K') {
            newKingPos[0] = i
          } else if (squares[state.sourceSelection]?.name === 'k') {
            newKingPos[1] = i
          }

          squares[state.sourceSelection] = undefined
          setState({
            sourceSelection: -1,
            squares: squares,
            player: newPlayer,
            status: '',
            kingPos: newKingPos,
            lastMove: [state.sourceSelection, i],
          })
        } else {
          setState({
            ...state,
            status:
              'Wrong selection. Choose valid source and destination again.',
            sourceSelection: -1,
          })
        }
      }
    }
  }

  // Check if king is in check
  const kingChecked = isCheck(
    state.squares,
    state.player === 'white' ? state.kingPos[0] : state.kingPos[1],
  )

  // Render 8x8 board
  for (let i = 0; i < 8; i++) {
    const squareRows = []

    for (let j = 0; j < 8; j++) {
      const squareIsLight =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? true : false
      const coord = i * 8 + j
      const currKing =
        state.player === 'white' ? state.kingPos[0] : state.kingPos[1]
      const checkSquare = coord === currKing && kingChecked // highlight checked king square red
      const isLastMoveSquare = state.lastMove.includes(coord)
      squareRows.push(
        renderSquare(
          state.squares[coord],
          squareIsLight,
          checkSquare,
          isLastMoveSquare,
          state.sourceSelection,
          coord,
          state.player,
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
      <h4 className={classes.turnText} style={{ color: state.player }}>
        {state.player} to move
      </h4>
      {/* <h5 className={classes.turnText}>{state.status}</h5> */}
    </div>
  )
}

export default Board
