import { makeStyles } from '@material-ui/core/styles'
import Piece from './pieces/Piece'

interface squareProps {
  isLight: boolean
  isSelected: boolean
  piece?: Piece
  currPlayer: String
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Square({
  isLight,
  isSelected,
  piece,
  currPlayer,
  onClick,
}: squareProps): JSX.Element {
  const squareColor = isLight ? '#DDA15E' : '#BC6C25'
  const iconUrl = piece ? piece.iconUrl : ''

  const useStyles = makeStyles((theme) => ({
    square: {
      backgroundColor: isSelected ? '#4A6252' : squareColor,
      backgroundImage: iconUrl,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '8em',
      width: '8em',
      border: '.1em solid transparent',
      borderRadius: 0,
      padding: 1,
      float: 'left',
  
      '&:focus': {
        outline: 'none',
      },

      '&:hover': {
        opacity: piece && currPlayer === piece.player ? .88 : 1,
      },
    },
  }))

  const classes = useStyles()

  return (
    <button
      className={classes.square}
      onClick={onClick}
    />
  )
}

Square.defaultProps = {
  piece: null,
}

export default Square
