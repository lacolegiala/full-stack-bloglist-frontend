/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      const loggedInUser = action.data
      return loggedInUser
    case 'LOGOUT':
      return initialState
    case 'REMEMBER_USER':
      return state
    default:
      return state
  }
}


export const loginUser = (username, password) => {
  return async dispatch => {
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