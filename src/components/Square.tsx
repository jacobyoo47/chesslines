import { makeStyles } from '@material-ui/core/styles'
import Piece from './pieces/Piece'

const useStyles = makeStyles((theme) => ({
  square: {
    backgroundColor: '#DDA15E',
    height: '8em',
    width: '8em',
    border: '.1em solid transparent',
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
  piece?: Piece
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Square({ isLight, piece, onClick }: squareProps): JSX.Element {
  const classes = useStyles()
  const squareColor = isLight ? '#DDA15E' : '#BC6C25'
  const iconUrl = piece ? piece.iconUrl : ''
  return (
    <button
      className={classes.square}
      style={{
        backgroundColor: squareColor,
        backgroundImage: iconUrl,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      onClick={onClick}
    />
  )
}

Square.defaultProps = {
  piece: null,
}

export default Square
