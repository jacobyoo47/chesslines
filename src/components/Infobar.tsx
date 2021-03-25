import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Chess from './Chess'

interface infobarProps {
  chessState: Chess
}

export default function Infobar({ chessState }: infobarProps): JSX.Element {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          marginLeft: theme.spacing(3),
          marginTop: 0,
          width: '20vw',
          height: '48vw',
        },
      },
      infoBar: {
        background: theme.palette.info.light,
      },
      turnText: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        color: chessState.player,
      },
      moveText: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        color: theme.palette.primary.main,
      },
    }),
  )
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
          <Typography variant="h6" className={classes.turnText}>
            {chessState.player} to move
          </Typography>
          <Typography variant="h5" className={classes.moveText}>
            Moves:{' '}
          </Typography>
          <Typography className={classes.moveText}>{moveListString}</Typography>
        </Grid>
      </Paper>
    </div>
  )
}
