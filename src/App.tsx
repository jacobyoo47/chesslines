import React from 'react'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Game from './components/Game'

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
        <Game />
      </ThemeProvider>
    </div>
  )
}

export default App
