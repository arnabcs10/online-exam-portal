import React, { createContext, useEffect, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (token) => {
    if (!token) {
        return false
    }

    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setSession = (token) => {
    if (token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { state : st } = useLocation()
    console.log(st);
    let keyword = ''
    if(st && st.redirectUrl)
    {
        keyword = st.redirectUrl.split("/")[1] 
    }
    
    let requestPath = keyword === 'assesment' ? '/api/students/login' : '/api/examiners/login'
    const login = async (email, password) => {
        const response = await axios.post(requestPath, { 
            email,
            password,
        })
        console.log(response.data);
        const { token } = response.data
        const user = {
            name: response.data.name,
            email: response.data.email,
            id: response.data._id
        }
        setSession(token)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, name, password) => {
        const response = await axios.post('/api/examiners', {
            email,
            name,
            password,
        })

        const { token } = response.data
        const user = {
            name: response.data.name,
            email: response.data.email,
            id: response.data._id
        }
        setSession(token)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const token = window.localStorage.getItem('token')

                if (token && isValidToken(token)) {
                    setSession(token)
                    const response = await axios.get('/api/examiners/profile')
                    const user = {
                        name: response.data.name,
                        email: response.data.email,
                        id: response.data._id
                    }

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
