import React from 'react'
import {
    Icon,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
    Button,
} from '@material-ui/core'
import { MatxMenu } from 'app/components'
import { Link } from 'react-router-dom'
import Brand from '../../components/Brand/Brand'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        // background:
        //     'linear-gradient(180deg, rgba(255, 255, 255, 0.0) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

        '& .topbar-hold': {
            // backgroundColor: palette.primary.main,
            height: 80,
            paddingLeft: 18,
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 14,
                paddingRight: 16,
            },
        },
        '& .fixed': {
            boxShadow: theme.shadows[8],
            height: 64,
        },
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
            // color: palette.text.secondary
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 185,
    },
}))

const Layout1Topbar = () => {
    const theme = useTheme()
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()
    const { logout, user, isAuthenticated } = useAuth()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const fixed = settings?.layout1Settings?.topbar?.fixed

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode

        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }

        updateSidebarMode({ mode })
    }

    return (
        <div className={classes.topbar}>
            <div className={clsx({ 'topbar-hold': true, fixed: fixed })}>
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        <Brand/>
                    </div>
                    <div className="flex items-center">
                        {
                            (isAuthenticated ? 
                                <MatxMenu
                                    menuButton={
                                        <div className={classes.userMenu}>
                                            <Hidden xsDown>
                                                <span>
                                                    <strong>{user.name}</strong>
                                                </span>
                                            </Hidden>
                                            <Avatar
                                                className="cursor-pointer"
                                                // src={user.avatar}
                                            />
                                        </div>
                                    }
                                >
                                    <MenuItem>
                                        <Link className={classes.menuItem} to="/">
                                            <Icon> home </Icon>
                                            <span className="pl-4"> Home </span>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            className={classes.menuItem}
                                            to="/"
                                        >
                                            <Icon> person </Icon>
                                            <span className="pl-4"> Profile </span>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem className={classes.menuItem}>
                                        <Icon> settings </Icon>
                                        <span className="pl-4"> Settings </span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={logout}
                                        className={classes.menuItem}
                                    >
                                        <Icon> power_settings_new </Icon>
                                        <span className="pl-4"> Logout </span>
                                    </MenuItem>
                                </MatxMenu>
                            :
                            <div><Link to='/session/signin'>
                                <Button variant="outlined" style={{color:"white", backgroundColor:"#18202e"}}>
                                    Sign In
                                </Button>
                                </Link>
                            </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Layout1Topbar)
