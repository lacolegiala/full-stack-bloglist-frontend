import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const history = useHistory()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  let { from } = location.state || { from: { pathname: '/blogs' } }

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password, () => {
      setUsername('')
      setPassword('')
      history.replace(from)
    }))
  }


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )
}

export default LoginForm