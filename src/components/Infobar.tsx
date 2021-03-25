import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Chess from './Chess'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        marginLeft: theme.spacing(3),
        marginTop: 0,
        width: theme.spacing(64),
        height: theme.spacing(100),
      },
    },
    infoBar: {
      background: theme.palette.info.light,
    },
    moveHeader: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
      color: theme.palette.secondary.main,
      fontSize: '24px',
      fontWeight: 'bold',
    },
    moveText: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
      color: theme.palette.primary.main,
    },
  }),
)

interface infobarProps {
  chessState: Chess
}

export default function Infobar({ chessState }: infobarProps): JSX.Element {
  const classes = useStyles()

  // Create move list
  let moveListString = ''
  const moveList = chessState.getMoveList()
  moveList.forEach((move, i) => {
    const currMove = Math.floor(i / 2) + 1
    if (i % 2 === 0) {
      moveListString += currMove.toString() + '. ' + move
    } else {
      moveListString += ' ' + move + ' '
    }
  })

  return (
    <div className={classes.root}>
      <Paper elevation={12} className={classes.infoBar}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="space-between"
          style={{
            display: 'flex',
          }}>
          <Typography className={classes.moveHeader}>Moves: </Typography>
          <Typography className={classes.moveText}>{moveListString}</Typography>
        </Grid>
      </Paper>
    </div>
  )
}
