import {Route, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'

const ProtectedRoute = ({children}) => {
    let navigate = useNavigate()

    const {
        authState: {authLoading, isAuthenticated}
    } = useContext(AuthContext)

    if (authLoading)
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    if (!isAuthenticated) {
        return navigate('/login')
    }
    return (
        children
    )
}

export default ProtectedRoute