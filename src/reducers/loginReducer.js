/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setErrorNotification } from './notificationReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      const loggedInUser = action.data
      return loggedInUser
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}


export const loginUser = (username, password, onSuccess) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      onSuccess()
    } catch (error) {
      dispatch(setErrorNotification('wrong credentials', 3))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer