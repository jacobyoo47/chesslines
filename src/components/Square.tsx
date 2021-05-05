import { makeStyles } from '@material-ui/core/styles'
import Piece from './pieces/Piece'
import { DisplayPiece } from './pieces/Piece'
import { PieceTypes } from '../static/pieceDragTypes'
import { useDrop } from 'react-dnd'

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
  piece?: Piece
  currPlayer: String
  coord: number
  onClick: React.MouseEventHandler<HTMLDivElement>
  onDrag: any
}

function Square({
  isLight,
  isSelected,
  isChecked,
  isLastMove,
  piece,
  currPlayer,
  coord,
  onClick,
  onDrag,
}: squareProps): JSX.Element {
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

  const [{ isOver }, drop] = useDrop({
    accept: [
      PieceTypes.KNIGHT,
      PieceTypes.BISHOP,
      PieceTypes.PAWN,
      PieceTypes.ROOK,
      PieceTypes.QUEEN,
      PieceTypes.KING,
    ],
    drop: (item: { coord: number }) => {
      onDrag(coord, item.coord)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <>
      <div ref={drop} className={classes.square} onClick={onClick}>
        {DisplayPiece(piece, coord, currPlayer)}
      </div>
    </>
  )
}

Square.defaultProps = {
  piece: null,
}

export default Square
