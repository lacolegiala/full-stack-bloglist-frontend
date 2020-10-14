/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const blogToEdit = action.data.likedBlog
      return state.map(blog =>
        blog.id !== id ? blog : blogToEdit
      )
    case 'GET':
      return action.data
    case 'REMOVE':
      const removableId = action.data.id
      return state.filter(blog => blog.id !== removableId)
    default:
      return state
  }
}

export const createBlog = data => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const voteAction = (id, blog) => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes : blog.likes
    }
    const likedBlog = await blogService.edit(id, updatedBlog)
    dispatch({
      type: 'LIKE',
      data: { id, likedBlog }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: { id }
    })
  }
}

export default reducer