import React from 'react'
import { ThemeProvider, makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Toolbar, AppBar } from '@material-ui/core'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    footer: {
        backgroundColor:'#18202e',
        minHeight: 'calc(var(--topbar-height) - 25px)',
        '@media (max-width: 499px)': {
            display: 'table',
            width: '100%',
            minHeight: 'auto',
            padding: '2rem 0',
            '& .container': {
                flexDirection: 'column !important',
                '& a': {
                    margin: '0 0 16px !important',
                },
            },
        },
    },
    appbar: {
        zIndex: 96,
    },
}))

const Footer = () => {
    const classes = useStyles()
    const theme = useTheme()
    const { settings } = useSettings()

    const footerTheme = settings.themes[settings.footer.theme] || theme

    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar
                color="primary"
                position="static"
                className={classes.appbar}
            >
                <Toolbar className={clsx('flex items-center', classes.footer)}>
                    <div className="flex items-center container w-full">
                        {/* <a
              href="https://github.com/"
              target="_blank"
              className="mr-2"
              rel="noopener noreferrer"
            >
              <Button variant="contained">Download Free version</Button>
            </a> */}
                        {/* <a href="">
                            <Button variant="contained" color="secondary">
                                
                            </Button>
                        </a> */}
                        <span className="m-auto"></span>
                        <p className="m-0">
                            Design and Developed by{' '}
                            <a href="https://github.com/arnabcs10">Group 10</a>
                        </p>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Footer
