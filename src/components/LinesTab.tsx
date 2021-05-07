import React from 'react'
import { Theme } from '@material-ui/core/styles'
import { Typography, Button, Toolbar } from '@material-ui/core'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../helpers/accordionHelpers'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  startPos,
  danishGambitLine,
  bongcloudDrawLine,
} from '../static/positions'
import {
  lineProps
} from './Game'

interface customAccordionProps {
  title: String
  desc: String
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
  desc,
  help,
  theme,
  classes,
  line,
  startFen,
  handleLine,
  expanded,
  onChange,
}: customAccordionProps) {
  const newLineState = { line: line, title: title, desc: desc }

  let lineString = ''
  for (let i = 0; i < line.length; i++) {
    if (i % 2 === 0) {
      lineString += (i / 2 + 1).toString() + '. '
    }
    lineString += line[i] + ' '
  }
  return (
    <Accordion
      // style={{ width: '100%' }}
      square
      className={classes.openingAccordion}
      expanded={expanded}
      onChange={onChange}>
      <AccordionSummary
        style={{
          backgroundColor: theme.palette.error.main,
          minHeight: 36,
          color: 'black',
          height: 36,
        }}
        expandIcon={<ExpandMoreIcon />}>
        <Typography style={{ fontSize: 14 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{ minHeight: 60, backgroundColor: theme.palette.error.dark }}>
        <Typography align="left" className={classes.lineDesc}>
          Description: {desc}
        </Typography>
        <Typography align="left" className={classes.lineDesc}>
          Line: {lineString}
        </Typography>
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

interface linesTabProps {
  value: number
  classes: any
  theme: Theme
  handleLine: any
  customLinesState: Array<lineProps>
}

export default function LinesTab({
  value,
  classes,
  theme,
  handleLine,
  customLinesState,
}: linesTabProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className={classes.lineAccordionsWrapper}>
      <Accordion square>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Openings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAccordion
            classes={classes}
            title="Danish Gambit"
            desc="Alekhine Variation"
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
          <Typography variant="h6">Other</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAccordion
            classes={classes}
            title="Bongcloud Draw"
            desc="Magnus Carlson vs. Hikaru Nakamura, Magnus Carlsen Invitational (2021) (rapid), chess24.com INT, rd 15, Mar-15"
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
      <Accordion square>
        <AccordionSummary
          araia-controls="panel3d-content"
          id="panel3d-header"
          expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Custom</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {customLinesState.map((userLine, i) => (
            <CustomAccordion
              classes={classes}
              title={userLine.title}
              desc={userLine.desc}
              help="dud"
              theme={theme}
              handleLine={handleLine}
              line={userLine.line}
              startFen={startPos}
              expanded={expanded === `panel${i + 3}`}
              onChange={handleChange(`panel${i + 3}`)}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
