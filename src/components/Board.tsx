import React from 'react'
import Chessboard from 'chessboardjsx'
import { makeStyles } from '@material-ui/core/styles'
import { startPos } from '../static/positions'

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.info.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function Board(): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Chessboard position={startPos} />
    </div>
  )
}

export default Board
