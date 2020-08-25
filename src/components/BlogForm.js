import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleBlogAdd = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleBlogAdd}>
      <h2>Add a new blog</h2>
      <ul>
        <label htmlFor="title">Title: </label>
        <input
          id='title'
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </ul>
      <ul>
        <label htmlFor="author">Author: </label>
        <input
          id='author'
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </ul>
      <ul>
        <label htmlFor="url">Url: </label>
        <input
          id='url'
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </ul>
      <button id="blog-submit" type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
