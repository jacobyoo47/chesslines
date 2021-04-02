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

  const inverseSquareColor = isLight ? darkSquare : lightSquare

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
    textWrapper: {
      width: '100%',
      height: '100%',
    },
    colText: {
      color: inverseSquareColor,
      fontSize: '1vw',
      position: 'relative',
      left: '43%',
      top: '104%',
      padding: 0,
      margin: 0,
    },
    rowText: {
      color: inverseSquareColor,
      fontSize: '1vw',
      position: 'relative',
      right: '68%',
      bottom: '0%',
      padding: 0,
      margin: 0,
    },
    cornerColText: {
      color: inverseSquareColor,
      fontSize: '1vw',
      position: 'relative',
      left: '40%',
      top: '84%',
      padding: 0,
      margin: 0,
    },
    cornerRowText: {
      color: inverseSquareColor,
      fontSize: '1vw',
      position: 'relative',
      right: '68%',
      bottom: '0%',
      padding: 0,
      margin: 0,
    },
  }))

  const classes = useStyles()

  const coordText = (position: number) => {
    let rowText = ''
    let rowClass = classes.rowText
    if (position % 8 === 0) {
      const row = 8 - position / 8
      rowText = row.toString()
    }

    let colText = ''
    let colClass = classes.colText
    if (
      (position > 55 && !isBoardFlipped) ||
      (position < 8 && isBoardFlipped)
    ) {
      const col = position % 8
      colText = String.fromCharCode(97 + col)
    }

    if (
      (position === 56 && !isBoardFlipped) ||
      (position === 0 && isBoardFlipped)
    ) {
      rowClass = classes.cornerRowText
      colClass = classes.cornerColText
    }

    return (
      <div className={classes.textWrapper}>
        <div className={rowClass}>{rowText}</div>
        <div className={colClass}>{colText}</div>
      </div>
    )
  }

  return (
    <button className={classes.square} onClick={onClick}>
      {coordText(coord)}
    </button>
  )
}

Square.defaultProps = {
  piece: null,
}

export default Square
