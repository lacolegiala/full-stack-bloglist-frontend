import React, {useState} from 'react'

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
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </ul>
      <ul>
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </ul>
      <ul>
        <label htmlFor="url">Url: </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </ul>
      <button type="submit">save</button>
    </form>  
  )
}

export default BlogForm
