import React from 'react'
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from '@material-ui/core'
import Tracker from './Tracker'

interface saveModalProps {
  open: boolean
  classes: any
  handleClose: any
  movesState: Tracker
  moveGrid: Array<any>
  handleSave: any
}

export default function SaveModal({
  open,
  classes,
  handleClose,
  movesState,
  moveGrid,
  handleSave,
}: saveModalProps): JSX.Element {
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setTitle(target.value)
  }

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setDesc(target.value)
  }

  const handleSaveButton = () => {
    handleSave(movesState.getMoveNameList(), title, desc)
    handleClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      color="primary">
      <DialogTitle id="simple-dialog-title" color="primary">
        Save Line?
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          required
          value={title}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={handleTitleChange}
          className={classes.saveModalTextField}
        />
        <TextField
          fullWidth
          required
          value={desc}
          id="outlined-basic"
          label="Desc"
          variant="outlined"
          onChange={handleDescChange}
          className={classes.saveModalTextField}
        />
        <Grid container direction="row">
          {moveGrid}
        </Grid>
        <Button autoFocus color="primary" onClick={handleSaveButton}>
          Save Line
        </Button>
      </DialogContent>
    </Dialog>
  )
}
