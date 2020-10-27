import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import NavigationBar from './components/NavigationBar'
import LoginForm from './components/LoginForm'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction, createBlog, removeBlog, initializeBlogs } from './reducers/blogReducer'
import { setNotification, setErrorNotification } from './reducers/notificationReducer'
import { getAllUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom'

const App = () => {
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

  function PrivateRoute({ children, ...rest }) {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loggedUserJSON ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }


  return (
    <Router>
      {user !== null &&
        <NavigationBar user={user}></NavigationBar>
      }
      {notification.text !== undefined && <Notification.Notification message={notification.text}></Notification.Notification>}
      {notification.error !== undefined && <Notification.ErrorNotification message={notification.error}></Notification.ErrorNotification>}
      <div>
        <Switch>
          <PrivateRoute exact path='/users'>
            <h2>users</h2>
            <User users={userList}></User>
          </PrivateRoute>
          <PrivateRoute exact path='/blogs'>
            <h2>blogs</h2>
            {blogForm()}
            {sortedBlogs}
          </PrivateRoute>
          <PrivateRoute path='/users/:id'>
            <IndividualUser></IndividualUser>
          </PrivateRoute>
          <PrivateRoute path='/blogs/:id'>
            <IndividualBlog handleLike={handleLike} user={user} handleRemoveBlog={handleRemove}></IndividualBlog>
          </PrivateRoute>
          <Route exact path='/'>
            <LoginForm></LoginForm>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App