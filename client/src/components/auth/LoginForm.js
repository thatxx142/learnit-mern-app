import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    // Context
    const {loginUser} = useContext(AuthContext)

    // Router
    // let navigate = useNavigate()

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const onChangeLoginForm = event => 
        setLoginForm({...loginForm, [event.target.name]: event.target.value})
    
    const login = async event => {
        event.preventDefault()
        

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                // navigate("/dashboard")
            } else {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
        }
    }

    return <>
    <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
            <Form.Control 
                type='text' 
                placeholder='Username' 
                name='username' 
                required
                className='mb-4'
                value={username}
                onChange={onChangeLoginForm}
            />
        </Form.Group>
        <Form.Group>
            <Form.Control 
                type='password' 
                placeholder='Password' 
                name='password' 
                required
                className='mb-4'
                value={password}
                onChange={onChangeLoginForm}
            />
        </Form.Group>
        <Button variant='success' type='submit'>Login</Button>
    </Form> 
    <p>Don't have an account?
        <Link to='/register'>
            <Button variant='info' size='sm' className='mx-2'>
                Register
            </Button>
        </Link>
    </p>
    </>
    
}

export default LoginForm