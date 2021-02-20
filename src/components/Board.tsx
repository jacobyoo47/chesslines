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
  squares: Array<Piece | undefined>,
  isLight: boolean,
  sourceSelection: number,
  position: number,
  player: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
): JSX.Element {
  return (
    <Square
      isLight={isLight}
      isSelected={sourceSelection === position}
      piece={squares[position]}
      currPlayer={player}
      onClick={onClick}
    />
  )
}

const initializePosition = (
  fen: string,
  state: {
    squares: (Piece | undefined)[]
    player: string
    sourceSelection: number
    status: string
  },
  setState: React.Dispatch<
    React.SetStateAction<{
      squares: (Piece | undefined)[]
      player: string
      sourceSelection: number
      status: string
    }>
  >,
): Array<Piece | undefined> => {
  console.log('initializing position')
  const squares = Array<Piece | undefined>(64).fill(undefined)
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

  setState({ ...state, squares: squares })
  return squares
}

function Board(): JSX.Element {
  const classes = useStyles()
  const board = []

  const [state, setState] = React.useState({
    squares: new Array<Piece | undefined>(),
    player: 'white',
    sourceSelection: -1,
    status: 'default',
  })

  React.useEffect(() => {
    initializePosition(startPos, state, setState)
  }, [])

  /**
   * Check all path indices are undefined. For one steps move of pawn/others or jumping moves of knight array is empty, so move is legal.
   * @param  {[number]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  const isMoveLegal = (srcToDestPath: number[]) => {
    let isLegal = true
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (state.squares[srcToDestPath[i]] !== undefined) {
        isLegal = false
      }
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
    console.log(i)
    console.log(squares[i])

    // No piece currently selected
    if (state.sourceSelection === -1) {
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
      if (squares[i] !== undefined && squares[i]?.player === state.player) {
        setState({
          ...state,
          status: 'Choose destination for the selected piece',
          sourceSelection: i,
        })
      } else {
        const isDestEnemyOccupied = squares[i] ? true : false
        const currPiece = squares[state.sourceSelection]
        // Should never be undefined, since sourceSelection is a valid piece
        const isMovePossible = currPiece?.isMovePossible(
          state.sourceSelection,
          i,
          isDestEnemyOccupied,
        )

        const srcToDestPath = squares[state.sourceSelection]?.getSrcToDestPath(
          state.sourceSelection,
          i,
        )

        if (
          srcToDestPath !== undefined &&
          isMovePossible &&
          isMoveLegal(srcToDestPath)
        ) {
          // if (squares[i]?.player === 'white') {
          //   whiteFallenSoldiers.push(squares[i])
          // } else {
          //   blackFallenSoldiers.push(squares[i])
          // }

          squares[i] = squares[state.sourceSelection]
          squares[state.sourceSelection] = undefined
          let player = state.player === 'white' ? 'black' : 'white'
          setState({
            sourceSelection: -1,
            squares: squares,
            player: player,
            status: '',
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

  // Render 8x8 board
  for (let i = 0; i < 8; i++) {
    const squareRows = []

    for (let j = 0; j < 8; j++) {
      const squareIsLight =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? true : false
      const coord = i * 8 + j
      squareRows.push(
        renderSquare(
          state.squares,
          squareIsLight,
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
