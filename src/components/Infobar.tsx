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
      marginLeft: theme.spacing(3),
    },
    moveText: {
      fontSize: '.7vw',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
      color: theme.palette.secondary.main,
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
}

function CustomAccordion({
  title,
  help,
  theme,
  classes,
  line,
  startFen,
  handleLine,
}: customAccordionProps) {
  const newLineState = { line: line, title: title }
  return (
    <Accordion
      style={{ width: '100%' }}
      square
      className={classes.openingAccordion}>
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
            Start
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
  classes: any
  theme: Theme
  moveListString: String
  lineState: { line: string[]; title: string } | undefined
  handleLine: any
}

function MainTab({
  value,
  classes,
  theme,
  moveListString,
  chessState,
  lineState,
  handleLine,
}: mainTabProps) {
  const currLineTitle =
    lineState !== undefined ? lineState.title : 'No line selected (Sandbox)'
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
      <Typography className={classes.moveText} align="left">
        {moveListString}
      </Typography>
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
  const [expanded, setExpanded] = React.useState<string | false>('panel1')

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <TabPanel value={value} index={1}>
      <div className={classes.lineAccordionsWrapper}>
        <Accordion
          square
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}>
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
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}>
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
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </TabPanel>
  )
}

interface infobarProps {
  chessState: Chess
  lineState: { line: string[]; title: string } | undefined
  handleLine: any
}

export default function Infobar({
  chessState,
  lineState,
  handleLine,
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
        <Tabs
          value={value}
          onChange={handleSwitch}
          aria-label="chesslines tabs"
          variant="fullWidth"
          textColor="primary"
          indicatorColor="secondary"
          style={{ backgroundColor: theme.palette.primary.dark }}>
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
          classes={classes}
          theme={theme}
          moveListString={moveListString}
          lineState={lineState}
          handleLine={handleLine}
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
