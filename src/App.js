import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { theme } from './theme/muiTheme'
import Routes from './routes'
import './assets/style/main.css'

export default () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
    </ThemeProvider>
)
