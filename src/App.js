import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)  
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showBlogForm, setShowBlogForm] = useState(false)

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

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }
      console.log(blogObject)
      const newBlog = await blogService.create(blogObject)
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      setShowBlogForm(false)
      setMessage(
        'New blog called ' + blogObject.title + ' added by ' + blogObject.author
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(title, author, url)
    }
    catch (exception) {
      setErrorMessage('Creating failed')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>  
  )


  const blogForm = () => {
    const hide = { display: showBlogForm ? 'none' : '' }
    const show = { display: showBlogForm ? '' : 'none' }

    return (
      <div>
        <div style={hide}>
          <button onClick={() => setShowBlogForm(true)}>Create a new blog</button>
        </div>
        <div style={show}>
          <BlogForm 
            handleBlogAdd={handleBlogAdd}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            author={author}
            title={title}
            url={url}
          />
          <button onClick={() => setShowBlogForm(false)}>cancel</button>
        </div>
      </div>
    )

  }



  return (
    <div>
      <h2>blogs</h2>
      {message !== '' && <Notification.Notification message={message}></Notification.Notification>}
      {errorMessage !== '' && <Notification.ErrorNotification message={errorMessage}></Notification.ErrorNotification>}

      {user === null && loginForm()}
      {user != null && 
        <div>
          <ul>
            {user.username} logged in
            <button onClick={logout}>Logout</button>
          </ul>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App