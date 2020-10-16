import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction, createBlog, removeBlog, initializeBlogs } from './reducers/blogReducer'
import { setNotification, setErrorNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { getAllUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const notification = useSelector(state => state.notifications)

  const user = useSelector(state => state.loggedInUser)

  const userList = useSelector(state => state.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGIN', data: user })
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorNotification('wrong credentials', 3))
    }
  }

  const logout = () => {
    try {
      dispatch(logoutUser())
      dispatch(setNotification('Logged out', 3))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setErrorNotification('Logging out failed', 3))
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(setNotification('New blog called ' + blogObject.title + ' added by ' + blogObject.author, 3))
    }
    catch (exception) {
      dispatch(setErrorNotification('Creating failed', 3))
    }
  }

  const handleLike = async (blogObject) => {
    try {
      dispatch(voteAction(blogObject.id, blogObject))
      dispatch(setNotification('Liked', 3))
    }
    catch (exception) {
      dispatch(setErrorNotification('Something went wrong', 3))
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      const removableBlogTitle = blogObject.title
      dispatch(removeBlog(blogObject.id))
      dispatch(setNotification('Removed blog ' + removableBlogTitle, 3))
    }
    catch (exception) {
      dispatch(setErrorNotification('Failed to delete blog', 3))
    }
  }

  const loginForm = () => (
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


  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} handleLike={handleLike}></BlogForm>
        </Togglable>
      </div>
    )
  }

  const sortedBlogs = [].concat(blogs)
    .sort((a, b) => a.likes > b.likes ? -1 : 1)
    .map((blog) =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemoveBlog={handleRemove} user={user}></Blog>
    )


  return (
    <Router>
      <div>
        <h2>blogs</h2>
        {notification.text !== undefined && <Notification.Notification message={notification.text}></Notification.Notification>}
        {notification.error !== undefined && <Notification.ErrorNotification message={notification.error}></Notification.ErrorNotification>}
        {user === null && loginForm()}
        {user !== null &&
          <div>
            <ul>
              {user.username} logged in
              <button onClick={logout}>Logout</button>
            </ul>
            {blogForm()}
            {sortedBlogs}
            <Route path='/users'>
              <h2>users</h2>
              <User users={userList}></User>
            </Route>
          </div>
        }
      </div>
    </Router>
  )
}

export default App