import React from 'react'
import Chessboard from 'chessboardjsx'
import { makeStyles } from '@material-ui/core/styles'

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
      <Chessboard
        width={1200}
        position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      />
    </div>
  )
}

export default Board
