import { makeStyles } from '@material-ui/core/styles'
import Piece from './pieces/Piece'

interface squareProps {
  isLight: boolean
  isSelected: boolean
  isChecked: boolean
  piece?: Piece
  currPlayer: String
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Square({
  isLight,
  isSelected,
  isChecked,
  piece,
  currPlayer,
  onClick,
}: squareProps): JSX.Element {
  const iconUrl = piece ? piece.iconUrl : ''
  const getBGColor = (
    isLight: boolean,
    isSelected: boolean,
    isChecked: boolean,
  ) => {
    if (!isSelected && !isChecked) {
      return isLight ? '#DDA15E' : '#BC6C25'
    } else if (isSelected) {
      return '#4A6252'
    } else if (isChecked) {
      return '#7f363b'
    }
  }

  const useStyles = makeStyles((theme) => ({
    square: {
      backgroundColor: getBGColor(isLight, isSelected, isChecked),
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
        opacity: piece && currPlayer === piece.player ? 0.88 : 1,
      },
    },
  }))

  const classes = useStyles()

  return <button className={classes.square} onClick={onClick} />
}

Square.defaultProps = {
  piece: null,
}

export default Square
