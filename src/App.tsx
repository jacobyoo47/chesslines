import React from 'react'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Board from './components/Board'

// Main app theme
const chessTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#20FC8F',
    },
    secondary: {
      main: '#3F5E5A',
    },

    // Background colors
    info: {
      main: '#2D2D2A',
      light: '#353831',
    },
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={chessTheme}>
        <Board />
      </ThemeProvider>
    </div>
  )
}

export default App
