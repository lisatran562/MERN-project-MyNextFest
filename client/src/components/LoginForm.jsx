import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginErrors, setLoginErrors] = useState('')

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/users/login`, {email, password}, {withCredentials:true})
            .then(res => {
                console.log('response when logging in', res)
                if(res.data.error) {
                    setLoginErrors(res.data.error)
                }else{
                    navigate('/dashboard')
                }
            })
            .catch(err => console.log('error when logging in', err))
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='login'>
                    <div className="form-group">
                        <label className='form-label'>Email:</label>
                        <input type='text' name='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Password:</label>
                        <input type='password' name='password' value={password} className='form-control' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <p className='text-danger'>{loginErrors}</p>
                    <input type="submit" value="Login" className='btn btn-secondary mt-3'/>
                </div>
            </form>
        </div>
    )
}

export default LoginForm