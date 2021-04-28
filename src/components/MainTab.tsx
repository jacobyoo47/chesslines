import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import {
  Theme,
} from '@material-ui/core/styles'
import { RookIcon } from '../static/svgIcons'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import ReplayIcon from '@material-ui/icons/Replay'
import ClearIcon from '@material-ui/icons/Clear'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed'
import GitHubIcon from '@material-ui/icons/GitHub'
import { startPos } from '../static/positions'
import Chess from './Chess'
import Tracker from './Tracker'

interface mainTabProps {
  value: number
  chessState: Chess
  movesState: Tracker
  classes: any
  theme: Theme
  moveGrid: Array<any>
  lineState: { line: string[]; title: string } | undefined
  handleLine: any
  handleSelection: any
  handleUndo: any
}

export default function MainTab({
  value,
  classes,
  theme,
  moveGrid,
  chessState,
  movesState,
  lineState,
  handleLine,
  handleSelection,
  handleUndo,
}: mainTabProps) {
  const currLineTitle =
    lineState !== undefined
      ? lineState.title + ' (Quiz)'
      : 'No line selected (Sandbox)'
  const lineIcon =
    lineState !== undefined ? (
      <GpsFixedIcon
        className={classes.targetLineIcon}
        style={{ color: theme.palette.primary.dark }}
      />
    ) : (
      <GpsNotFixedIcon
        className={classes.targetLineIcon}
        style={{ color: theme.palette.primary.dark }}
      />
    )

  return (
    <>
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
          <div className={classes.leftToolbarWrapper}>
            {lineIcon}
            <Typography variant="h6" className={classes.lineText}>
              {currLineTitle}
            </Typography>
          </div>
          {lineState ? (
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={() => handleLine(undefined, startPos)}>
              <ClearIcon style={{ color: theme.palette.primary.dark }} />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Typography
        variant="h6"
        style={{
          color:
            chessState.player === 'white'
              ? theme.palette.warning.light
              : theme.palette.warning.dark,
        }}
        className={classes.turnText}>
        {chessState.player} to move
      </Typography>
      <div id="nav-button-bar">
        <Tooltip title="Reset" enterDelay={700} arrow>
          <IconButton
            className={classes.navButton}
            onClick={() => handleSelection(0)}>
            <SkipPreviousIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Prev" enterDelay={700} arrow>
          <IconButton
            className={classes.navButton}
            onClick={() =>
              handleSelection(
                movesState.selectedMove > 0 ? movesState.selectedMove - 1 : 0,
              )
            }>
            <NavigateBeforeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next" enterDelay={700} arrow>
          <IconButton
            className={classes.navButton}
            onClick={() =>
              handleSelection(
                movesState.selectedMove < movesState.moveNameList.length
                  ? movesState.selectedMove + 1
                  : movesState.selectedMove,
              )
            }>
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="End" enterDelay={700} arrow>
          <IconButton
            className={classes.navButton}
            onClick={() => handleSelection(movesState.moveNameList.length)}>
            <SkipNextIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo" enterDelay={700} arrow>
          <IconButton
            className={classes.navButton}
            onClick={() => handleUndo()}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Grid container direction="row">
        {moveGrid}
      </Grid>
    </>
  )
}
