import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { Form } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group controlId='username'>
        <Form.Label>username</Form.Label>
        <Form.Control
          placeholder='Enter username'
          onChange={({ target }) => setUsername(target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          onChange={({ target }) => setPassword(target.value)}
        ></Form.Control>
      </Form.Group>
      <button id='login' type="submit">login</button>
    </Form>
  )
}

export default LoginForm