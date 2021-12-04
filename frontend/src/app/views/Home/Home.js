import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import TopBar from './TopBar'
import useSettings from 'app/hooks/useSettings'
import Footer from '../../components/Footer/Footer'
const Home = () => {
    const { settings, updateSettings } = useSettings()
    const { layout1Settings, secondarySidebar } = settings
    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const {
        isAuthenticated,
        logout,
        // user
    } = useAuth() 
    const bgImgURL = '/assets/images/illustrations/home.jpg'
    return (
        <div
            style={{
                backgroundImage:`url(${bgImgURL})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                overflow: 'hidden',
                top:0
            }}
        >
            <ThemeProvider theme={topbarTheme}>
                <TopBar fixed={true} className="elevation-z8" />
            </ThemeProvider>
            <div
                style={{
                    height:"85.6vh"
                }}
            >
                Home

                {
                    (isAuthenticated ? <div>
                        <Link to='/class'>Go to Classroom</Link>
                        <div style={{cursor:"pointer"}} onClick={logout}>SignOut</div>
                        </div> 
                    :
                    <div><Link to='/session/signin'>SignIn</Link></div>
                    )
                }
            </div>
            
            <Footer/>
        </div>
    )
}

export default Home
