import { makeStyles } from '@material-ui/core/styles'
import Piece from './pieces/Piece'

const lightSquare = '#DDA15E'
const darkSquare = '#BC6C25'
const selectedSquare = '#4A6252'
const lastMoveSquare = '#524A62'
const checkedSquare = '#C61236'

interface squareProps {
  isLight: boolean
  isSelected: boolean
  isChecked: boolean
  isLastMove: boolean
  isBoardFlipped: boolean
  piece?: Piece
  currPlayer: String
  coord: number
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Square({
  isLight,
  isSelected,
  isChecked,
  isLastMove,
  isBoardFlipped,
  piece,
  currPlayer,
  coord,
  onClick,
}: squareProps): JSX.Element {
  const iconUrl = piece ? piece.iconUrl : ''
  const getBGColor = (
    isLight: boolean,
    isSelected: boolean,
    isChecked: boolean,
    isLastMove: boolean,
  ) => {
    if (!isSelected && !isChecked && !isLastMove) {
      return isLight ? lightSquare : darkSquare
    } else if (isSelected) {
      return selectedSquare
    } else if (isChecked) {
      return checkedSquare
    } else if (isLastMove) {
      return lastMoveSquare
    }
  }

  const useStyles = makeStyles((theme) => ({
    square: {
      backgroundColor: getBGColor(isLight, isSelected, isChecked, isLastMove),
      backgroundImage: iconUrl,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '6vw',
      width: '6vw',
      border: '.1em solid transparent',
      borderRadius: 0,
      padding: 1,
      float: 'left',

      '&:focus': {
        outline: 'none',
      },

      '&:hover': {
        opacity: piece && currPlayer === piece.player ? 0.88 : 1,
        cursor: piece && currPlayer === piece.player ? 'pointer' : 'default',
      },
    },
  }))

  const classes = useStyles()

  return (
    <>
      <button className={classes.square} onClick={onClick}></button>
    </>
  )
}

Square.defaultProps = {
  piece: null,
}

export default Square
