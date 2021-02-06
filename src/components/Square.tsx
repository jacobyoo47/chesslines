import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  square: {
    backgroundColor: '#DDA15E',
    height: 128,
    width: 128,
    border: '1px solid black',
    borderRadius: 0,
    margin: '-1px',
    padding: 1,
    float: 'left',

    '&:focus': {
      outline: 'none',
    },
  },
}))

interface squareProps {
  isLight: boolean
}

function Square({ isLight }: squareProps): JSX.Element {
  const classes = useStyles()
  const squareColor = isLight ? '#DDA15E' : '#BC6C25'
  return (
    <button
      className={classes.square}
      style={{ backgroundColor: squareColor }}
    />
  )
}

export default Square
