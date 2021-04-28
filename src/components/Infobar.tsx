import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  useTheme,
} from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import { RookIcon, KingIcon } from '../static/svgIcons'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import ClearIcon from '@material-ui/icons/Clear'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed'
import GitHubIcon from '@material-ui/icons/GitHub'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Paper from '@material-ui/core/Paper'
import {
  startPos,
  danishGambitLine,
  bongcloudDrawLine,
} from '../static/positions'
import Chess from './Chess'
import Tracker from './Tracker'
import React from 'react'

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
      width: '20vw',
    },
    infoText: {
      color: theme.palette.secondary.light,
      fontSize: '0.8vw',
    },
    lineText: {
      color: theme.palette.primary.dark,
      fontSize: '0.8vw',
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
      marginLeft: theme.spacing(2),
    },
    moveText: {
      fontSize: '.7vw',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
    },
    moveNumberText: {
      fontSize: '.5vw',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    tab: {
      minWidth: '60px',
    },
    lineAccordionsWrapper: {
      width: '100%',
    },
    lineButton: {
      marginRight: theme.spacing(3),
    },
    navButton: {
      color: theme.palette.primary.light,
      margin: 0,
    },
    openingAccordion: {
      width: '100%',
      backgroundColor: theme.palette.error.light,
    },
  }),
)

const Accordion = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.error.dark}`,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion)

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    borderBottom: `1px solid ${theme.palette.error.dark}`,
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    color: 'white',
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
  },
}))(MuiAccordionDetails)

interface customAccordionProps {
  title: String
  help: string
  theme: Theme
  classes: any
  line: string[]
  startFen: string
  handleLine: any
  expanded: boolean
  onChange: any
}

function CustomAccordion({
  title,
  help,
  theme,
  classes,
  line,
  startFen,
  handleLine,
  expanded,
  onChange,
}: customAccordionProps) {
  const newLineState = { line: line, title: title }
  return (
    <Accordion
      style={{ width: '100%' }}
      square
      className={classes.openingAccordion}
      expanded={expanded}
      onChange={onChange}>
      <AccordionSummary
        style={{ backgroundColor: theme.palette.error.light, color: 'black' }}
        expandIcon={<ExpandMoreIcon />}>
        <Toolbar>
          <KingIcon />
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AccordionSummary>
      <AccordionDetails
        style={{ minHeight: 60, backgroundColor: theme.palette.error.dark }}>
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLine(newLineState, startFen)}
            className={classes.lineButton}>
            Quiz
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href={help}
            target="_blank"
            className={classes.lineButton}>
            Help
          </Button>
        </Toolbar>
      </AccordionDetails>
    </Accordion>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && (
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="space-between"
          style={{
            display: 'flex',
          }}>
          {children}
        </Grid>
      )}
    </div>
  )
}

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
}

function MainTab({
  value,
  classes,
  theme,
  moveGrid,
  chessState,
  movesState,
  lineState,
  handleLine,
  handleSelection,
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
    <TabPanel value={value} index={0}>
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
      <div>
        <IconButton
          className={classes.navButton}
          onClick={() => handleSelection(0)}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          className={classes.navButton}
          onClick={() =>
            handleSelection(
              movesState.selectedMove > 0 ? movesState.selectedMove - 1 : 0,
            )
          }>
          <NavigateBeforeIcon />
        </IconButton>
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
        <IconButton
          className={classes.navButton}
          onClick={() => handleSelection(movesState.moveNameList.length)}>
          <SkipNextIcon />
        </IconButton>
      </div>
      <Grid container direction="row">
        {moveGrid}
      </Grid>
    </TabPanel>
  )
}

interface linesTabProps {
  value: number
  classes: any
  theme: Theme
  handleLine: any
}

function LinesTab({ value, classes, theme, handleLine }: linesTabProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <TabPanel value={value} index={1}>
      <div className={classes.lineAccordionsWrapper}>
        <Accordion square>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}>
            <Typography>Openings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CustomAccordion
              classes={classes}
              title="Danish Gambit"
              help="https://en.wikipedia.org/wiki/Danish_Gambit#Alekhine_Variation:_4.Nxc3"
              theme={theme}
              handleLine={handleLine}
              line={danishGambitLine}
              startFen={startPos}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion square>
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            expandIcon={<ExpandMoreIcon />}>
            <Typography>Other</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CustomAccordion
              classes={classes}
              title="Bongcloud Draw"
              help="https://www.chessgames.com/perl/chessgame?gid=2029671"
              theme={theme}
              handleLine={handleLine}
              line={bongcloudDrawLine}
              startFen={startPos}
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </TabPanel>
  )
}

interface infobarProps {
  chessState: Chess
  movesState: Tracker
  lineState: { line: string[]; title: string } | undefined
  handleLine: any
  handleSelection: any
}

export default function Infobar({
  chessState,
  movesState,
  lineState,
  handleLine,
  handleSelection,
}: infobarProps): JSX.Element {
  const theme = useTheme()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleSwitch = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleLineChange = (
    lineState: { line: string[]; title: string } | undefined,
    startFen: string,
  ) => {
    handleLine(lineState, startFen)
    setValue(0) // Go back to main tab after starting new line
  }

  // Create move list
  const moveGrid = new Array<any>()
  const moveListLen = movesState.getMoveNameList().length
  const moveList =
    lineState === undefined ? movesState.getMoveNameList() : lineState!.line
  moveList.forEach((move, i) => {
    const currMove = Math.floor(i / 2) + 1
    const moveText = i < moveListLen ? move : '??'
    const moveColor =
      i === movesState.selectedMove - 1
        ? theme.palette.warning.dark
        : theme.palette.warning.light
    if (i % 2 === 0) {
      moveGrid.push(
        <Grid item>
          <Typography
            className={classes.moveNumberText}
            style={{ color: theme.palette.warning.light }}
            align="left">
            {currMove.toString()}
          </Typography>
        </Grid>,
      )
    }
    moveGrid.push(
      <Grid item>
        <Typography
          className={classes.moveText}
          style={{ color: moveColor }}
          align="left">
          {moveText}
        </Typography>
      </Grid>,
    )
  })

  return (
    <div className={classes.root}>
      <Paper elevation={12} className={classes.infoBar}>
        <Tabs
          value={value}
          onChange={handleSwitch}
          aria-label="chesslines tabs"
          variant="fullWidth"
          textColor="primary"
          indicatorColor="secondary"
          style={{
            backgroundColor: theme.palette.primary.dark,
            height: '2vw',
          }}>
          <Tab
            className={classes.tab}
            label="Main"
            id={`tab-0`}
            aria-controls={`tabpanel-0`}
          />
          <Tab
            className={classes.tab}
            label="Lines"
            id={`tab-1`}
            aria-controls={`tabpanel-1`}
          />
        </Tabs>
        <MainTab
          value={value}
          chessState={chessState}
          movesState={movesState}
          classes={classes}
          theme={theme}
          moveGrid={moveGrid}
          lineState={lineState}
          handleLine={handleLine}
          handleSelection={handleSelection}
        />
        <LinesTab
          value={value}
          theme={theme}
          classes={classes}
          handleLine={handleLineChange}
        />
      </Paper>
    </div>
  )
}
