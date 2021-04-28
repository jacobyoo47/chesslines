import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, Toolbar } from '@material-ui/core'
import { KingIcon } from '../static/svgIcons'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  startPos,
  danishGambitLine,
  bongcloudDrawLine,
} from '../static/positions'

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

interface linesTabProps {
  value: number
  classes: any
  theme: Theme
  handleLine: any
}

export default function LinesTab({ value, classes, theme, handleLine }: linesTabProps) {
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
