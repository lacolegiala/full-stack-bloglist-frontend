/* eslint-disable no-case-declarations */
/* eslint-disable indent */

import userService from'../services/users'


const reducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_USERS':
      const userList = action.data
      return userList
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default reducer