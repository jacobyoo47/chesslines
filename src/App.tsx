import React from 'react'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Game from './components/Game'

// Main app theme
const chessTheme = createMuiTheme({
  palette: {
    primary: {
      // main: '#20FC8F',
      main: '#C27A3A',
      dark: '#613D1D',
    },
    secondary: {
      // main: '#3F5E5A',
      main: '#E3B37E',
      light: '#ebc9a4',
    },

    // Background colors
    info: {
      main: '#2D2D2A',
      light: '#353831',
      dark: '#565650',
    },

    // Square colors
    warning: {
      main: '#DDA15E',
      light: '#DDA15E',
      dark: '#BC6C25',
    },

    error: {
      main: '#87282b',
      dark: '#4c1718',
      light: '#c9b9b9',
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
