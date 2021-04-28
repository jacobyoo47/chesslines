import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'

export const Accordion = withStyles((theme) => ({
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

export const AccordionSummary = withStyles((theme) => ({
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

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
  },
}))(MuiAccordionDetails)
