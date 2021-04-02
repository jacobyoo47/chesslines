import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed'
import GitHubIcon from '@material-ui/icons/GitHub'
import Paper from '@material-ui/core/Paper'
import Chess from './Chess'

interface infobarProps {
  chessState: Chess
}

function RookIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <g>
        <g>
          <path d="M400.906,444.377H111.094c-15.978,0-28.981,13.003-28.981,28.981v9.66c0,15.978,13.003,28.981,28.981,28.981h289.811    c15.978,0,28.981-13.003,28.981-28.981v-9.66C429.887,457.38,416.884,444.377,400.906,444.377z M410.566,483.019    c0,5.323-4.328,9.66-9.66,9.66H111.094c-5.323,0-9.66-4.338-9.66-9.66v-9.66c0-5.323,4.338-9.66,9.66-9.66h289.811    c5.333,0,9.66,4.338,9.66,9.66V483.019z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M352.604,405.736H159.396c-15.978,0-28.981,13.003-28.981,28.981s13.003,28.981,28.981,28.981h193.208    c15.978,0,28.981-13.003,28.981-28.981S368.582,405.736,352.604,405.736z M352.604,444.377H159.396c-5.323,0-9.66-4.338-9.66-9.66    s4.338-9.66,9.66-9.66h193.208c5.333,0,9.66,4.338,9.66,9.66S357.936,444.377,352.604,444.377z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M352.604,164.226H159.396c-15.978,0-28.981,13.003-28.981,28.981c0,15.978,13.003,28.981,28.981,28.981h193.208    c15.978,0,28.981-13.003,28.981-28.981C381.585,177.229,368.582,164.226,352.604,164.226z M352.604,202.868H159.396    c-5.323,0-9.66-4.338-9.66-9.66c0-5.323,4.338-9.66,9.66-9.66h193.208c5.333,0,9.66,4.338,9.66,9.66    C362.264,198.53,357.936,202.868,352.604,202.868z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M313.962,125.585H198.038c-5.333,0-9.66,4.328-9.66,9.66v38.641c0,5.333,4.328,9.66,9.66,9.66h115.924    c5.333,0,9.66-4.328,9.66-9.66v-38.641C323.623,129.913,319.295,125.585,313.962,125.585z M304.302,164.226h-96.604v-19.321    h96.604V164.226z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M341.127,286.421c-5.13-13.679-7.844-36.429-7.844-65.797v-8.095c0-5.333-4.328-9.66-9.66-9.66H188.377    c-5.333,0-9.66,4.328-9.66,9.66v8.095c0,29.368-2.705,52.118-7.835,65.797c-7.622,20.325-11.486,41.491-11.486,62.918v66.058    c0,5.333,4.328,9.66,9.66,9.66h173.887c5.333,0,9.66-4.328,9.66-9.66v-66.058C352.604,327.912,348.749,306.746,341.127,286.421z     M333.283,405.736H178.717l0.01-56.397c0-19.108,3.458-37.994,10.259-56.136c5.912-15.785,8.965-39.675,9.061-71.013h115.924    c0.087,31.338,3.14,55.228,9.061,71.013c6.801,18.142,10.25,37.028,10.25,56.136V405.736z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M362.264,0h-38.641c-5.333,0-9.66,4.328-9.66,9.66v28.981h-28.981V9.66c0-5.333-4.328-9.66-9.66-9.66h-38.642    c-5.333,0-9.66,4.328-9.66,9.66v28.981h-28.981V9.66c0-5.333-4.328-9.66-9.66-9.66h-38.642c-5.333,0-9.66,4.328-9.66,9.66v77.283    c0,2.56,1.014,5.014,2.831,6.83l48.302,48.302c1.806,1.816,4.27,2.83,6.83,2.83h115.924c2.56,0,5.014-1.014,6.83-2.83    l48.302-48.302c1.816-1.806,2.831-4.27,2.831-6.83V9.66C371.925,4.328,367.597,0,362.264,0z M352.594,82.944l-42.641,42.641    H202.037l-42.651-42.641V19.321h19.321v28.981c0,5.333,4.328,9.66,9.66,9.66h48.302c5.333,0,9.66-4.328,9.66-9.66V19.321h19.321    v28.981c0,5.333,4.328,9.66,9.66,9.66h48.302c5.333,0,9.66-4.328,9.66-9.66V19.321h19.321V82.944z" />
        </g>
      </g>
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
      lineText: {
        color: theme.palette.primary.main,
      },
      rookIcon: {
        marginRight: theme.spacing(2),
      },
      leftToolbarWrapper: {
        flexGrow: 1,
        display: 'flex',
      },
      targetLineIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
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
              <div className={classes.leftToolbarWrapper}>
                <RookIcon viewBox="0 0 512 512" className={classes.rookIcon} />
                <Typography variant="h6" className={classes.infoText}>
                  chesslines --- by jacob yoo
                </Typography>
              </div>
              <IconButton
                href="https://github.com/godpng/chesslines"
                target="_blank"
                edge="end"
                color="inherit"
                aria-label="menu">
                <GitHubIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <GpsNotFixedIcon className={classes.targetLineIcon} />
              <Typography variant="h6" className={classes.lineText}>
                No line selected (Sandbox)
              </Typography>
            </Toolbar>
          </AppBar>
          <Typography variant="h6" className={classes.turnText}>
            {chessState.player} to move
          </Typography>
          <Typography className={classes.moveText} align="left">
            {moveListString}
          </Typography>
        </Grid>
      </Paper>
    </div>
  )
}
