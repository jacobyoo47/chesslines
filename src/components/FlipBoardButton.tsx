import { IconButton, ThemeProvider } from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(5),
      color: 'red',
      backgroundColor: theme.palette.primary.main,
    },
  }),
)

interface flipButtonProps {
  boardFlipped: boolean
  onClick: any
}

export default function FlipBoardButton({
  boardFlipped,
  onClick,
}: flipButtonProps): JSX.Element {
  const classes = useStyles()
  return (
    <IconButton className={classes.root} edge="start" aria-label="menu">
      <AutorenewIcon onClick={onClick} />
    </IconButton>
  )
}
