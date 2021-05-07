import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles'
import { Typography, Grid, Tabs, Tab, ThemeProvider } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import LinesTab from './LinesTab'
import MainTab from './MainTab'
import Chess from './Chess'
import Tracker from './Tracker'
import { lineProps } from './Game'
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
    lineDesc: {
      fontSize: 14,
      color: theme.palette.error.light,
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
    },
    navButton: {
      color: theme.palette.primary.light,
      margin: 0,
    },
    openingAccordion: {
      width: '100%',
      backgroundColor: theme.palette.error.light,
    },
    saveModalTextField: {
      marginBottom: theme.spacing(2),
    },
  }),
)

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

interface infobarProps {
  chessState: Chess
  movesState: Tracker
  lineState: { line: string[]; title: string } | undefined
  customLinesState: Array<lineProps>
  handleLine: any
  handleSelection: any
  handleUndo: any
  handleSave: any
}

export default function Infobar({
  chessState,
  movesState,
  lineState,
  customLinesState,
  handleLine,
  handleSelection,
  handleUndo,
  handleSave,
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
        <TabPanel value={value} index={0}>
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
            handleUndo={handleUndo}
            handleSave={handleSave}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LinesTab
            value={value}
            theme={theme}
            classes={classes}
            handleLine={handleLineChange}
            customLinesState={customLinesState}
          />
        </TabPanel>
      </Paper>
    </div>
  )
}
