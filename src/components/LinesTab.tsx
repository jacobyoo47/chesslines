import React from 'react'
import { Theme } from '@material-ui/core/styles'
import { Typography, Button, Toolbar } from '@material-ui/core'
import { KingIcon } from '../static/svgIcons'
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

interface linesTabProps {
  value: number
  classes: any
  theme: Theme
  handleLine: any
  customLinesState: Array<{ line: string[]; title: string }>
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
      <Accordion square>
        <AccordionSummary
          araia-controls="panel3d-content"
          id="panel3d-header"
          expandIcon={<ExpandMoreIcon />}>
          <Typography>Custom</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {customLinesState.map((userLine, i) => (
            <CustomAccordion
              classes={classes}
              title={userLine.title}
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
