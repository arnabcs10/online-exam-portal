import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import TopBar from './TopBar'
import useSettings from 'app/hooks/useSettings'
import Footer from '../../components/Footer/Footer'
import { Container, Button, Icon,Typography } from '@material-ui/core'

const Home = () => {
    const { settings } = useSettings()
    const { layout1Settings } = settings
    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const {
        isAuthenticated,
    } = useAuth() 
    // const bgImgURL = '/assets/images/illustrations/home.jpg'
    const bgImgURL = '/assets/images/illustrations/desktop1.svg'
    
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
                <Container maxWidth="lg" className="h-full justify-center" style={{display:"flex", flexDirection:"column"}}>
                    <div  
                        style={{
                            height:"25%",
                            width:"50%"
                        }}
                    >
                        
                        <Typography variant="h4" gutterBottom component="div">
                            Where teaching and learning come together
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Google Classroom is your all-in-one place for teaching and learning. Our easy-to-use and secure tool helps educators manage, measure, and enrich learning experiences.
                        </Typography>
                    
                        <br />
                          {(isAuthenticated && (<Button className="mt-2" style={{color:"white", backgroundColor:"#18202e"}}>
                            <Link to='/class'>Go to Classroom</Link>
                                <Icon>
                                    arrow_forward
                                </Icon>
                            </Button>
                            ))}          
                    </div>
                </Container>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Home
