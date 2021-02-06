import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Square from './Square'
import { startPos } from '../static/positions'
import { render } from '@testing-library/react'

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.info.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function isEven(num: number): boolean {
  return num % 2 == 0
}

function renderSquare(isLight: boolean): JSX.Element {
  return <Square isLight={isLight} />
}

function Board(): JSX.Element {
  const classes = useStyles()
  const board = []

  for (let i = 0; i < 8; i++) {
    const squareRows = []
    for (let j = 0; j < 8; j++) {
      const squareIsLight =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? true : false
      squareRows.push(renderSquare(squareIsLight))
    }
    board.push(<div className="board-row">{squareRows}</div>)
  }

  return <div>{board}</div>
}

export default Board
