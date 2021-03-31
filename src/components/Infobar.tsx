import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  ThemeProvider,
} from '@material-ui/core'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import Paper from '@material-ui/core/Paper'
import Chess from './Chess'

interface infobarProps {
  chessState: Chess
}

function RookIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M55.142,20.831H18.858a5.916,5.916,0,0,1-5.909-5.91V3.692A1.694,1.694,0,0,1,14.642,2h7.835a1.694,1.694,0,0,1,1.692,1.692v6.317L30.3,9.946l-.063-6.254A1.7,1.7,0,0,1,31.93,2h8.988A1.694,1.694,0,0,1,42.61,3.692v6.317l6.131-.063-.063-6.254A1.694,1.694,0,0,1,50.37,2h8.988a1.694,1.694,0,0,1,1.693,1.692V14.921A5.916,5.916,0,0,1,55.142,20.831ZM14.949,4V14.921a3.914,3.914,0,0,0,3.909,3.91H55.142a3.914,3.914,0,0,0,3.909-3.91V4H50.678v6.009a1.939,1.939,0,0,1-1.937,1.937H42.547a1.939,1.939,0,0,1-1.937-1.937V4H32.237v6.009A1.939,1.939,0,0,1,30.3,11.946H24.106a1.94,1.94,0,0,1-1.937-1.937V4Z" />
      <path d="M55.44,59.013H18.56a1,1,0,0,1-.877-1.48c4.545-8.293,6.424-16.734,3.345-37.556a1,1,0,0,1,.989-1.146H51.983A1,1,0,0,1,52.968,20c-2.037,11.576-3.115,27.474,3.313,37.468a1,1,0,0,1-.841,1.541Zm-35.221-2H53.683c-4.541-8.27-5.512-20.424-2.886-36.182H23.173C25.927,40.193,24.319,48.942,20.219,57.013Z" />
      <path d="M28.5,72H25.56a1,1,0,0,1,0-2H28.5a1,1,0,0,1,0,2Z" />
      <path d="M62.36,72H45.44a1,1,0,0,1,0-2H61.36V64.27a5.271,5.271,0,0,0-5.27-5.26H17.91a5.271,5.271,0,0,0-5.27,5.26V70h5.92a1,1,0,1,1,0,2H11.64a1,1,0,0,1-1-1V64.27a7.273,7.273,0,0,1,7.27-7.26H56.09a7.273,7.273,0,0,1,7.27,7.26V71A1,1,0,0,1,62.36,72Z" />
      <path d="M38.44,72H35.5a1,1,0,0,1,0-2h2.94a1,1,0,0,1,0,2Z" />
    </SvgIcon>
  )
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
      infoText: {
        color: theme.palette.secondary.light,
      },
      turnText: {
        fontSize: '1vw',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        color:
          chessState.player === 'white'
            ? theme.palette.warning.light
            : theme.palette.warning.dark,
      },
      moveText: {
        fontSize: '.7vw',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        color: theme.palette.secondary.main,
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
          <AppBar position="static">
            <Toolbar>
              <RookIcon viewBox="0 0 74 74" />
              <Typography variant="h6" className={classes.infoText}>
                chesslines --- by godpng
              </Typography>
            </Toolbar>
          </AppBar>
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
