import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification, setErrorNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/loginReducer'
import { Breadcrumb } from 'react-bootstrap'

const LoginInfo = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const logout = () => {
    try {
      dispatch(logoutUser())
      dispatch(setNotification('Logged out', 3))
    }
    catch (exception) {
      console.log(exception)
      dispatch(setErrorNotification('Logging out failed', 3))
    }
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href='/blogs'>blogs</Breadcrumb.Item>
        <Breadcrumb.Item href='/users'>users</Breadcrumb.Item>
      </Breadcrumb>
      {props.user.username} logged in
      <button onClick={ () => {
        history.push('/')
        logout()
      }}>Logout</button>
    </div>
  )
}

export default LoginInfo