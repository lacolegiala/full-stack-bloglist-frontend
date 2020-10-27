import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification, setErrorNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/loginReducer'

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
      <ul>
        {props.user.username} logged in
        <button onClick={ () => {
          history.push('/')
          logout()
        }}>Logout</button>
      </ul>
    </div>
  )
}

export default LoginInfo