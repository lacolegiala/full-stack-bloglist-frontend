import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setMessage('Logged out')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Logging out failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage(
        'New blog called ' + blogObject.title + ' added by ' + blogObject.author
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    catch (exception) {
      setErrorMessage('Creating failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLike = async (blogObject) => {
    try {
      const likedBlog = await blogService.edit(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : likedBlog))
      setMessage(
        'Liked'
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      const removableBlogTitle = blogObject.title
      const removableBlog = await blogService.remove(blogObject.id, blogObject)
      setBlogs(blogs.filter(blog => blog.id !== removableBlog.id))
      setMessage(
        'Removed blog ' + removableBlogTitle
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Failed to delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
    <div>
      <h2>blogs</h2>
      {message !== '' && <Notification.Notification message={message}></Notification.Notification>}
      {errorMessage !== '' && <Notification.ErrorNotification message={errorMessage}></Notification.ErrorNotification>}
      {user === null && loginForm()}
      {user !== null &&
        <div>
          <ul>
            {user.username} logged in
            <button onClick={logout}>Logout</button>
          </ul>
          {blogForm()}
          {sortedBlogs}
        </div>
      }
    </div>
  )
}

export default App