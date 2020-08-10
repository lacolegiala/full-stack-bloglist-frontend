import React from 'react'

const BlogForm = (props) => (
  <form onSubmit={props.handleBlogAdd}>
    <h2>Add a new blog</h2>
    <ul>
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        id="title"
        value={props.title}
        onChange={({ target }) => props.setTitle(target.value)}
      />
    </ul>
    <ul>
      <label htmlFor="author">Author: </label>
      <input
        type="text"
        id="author"
        value={props.author}
        onChange={({ target }) => props.setAuthor(target.value)}
      />
    </ul>
    <ul>
      <label htmlFor="url">Url: </label>
      <input
        type="text"
        id="url"
        value={props.url}
        onChange={({ target }) => props.setUrl(target.value)}
      />
    </ul>
    <button type="submit">save</button>
  </form>  
)

export default BlogForm
