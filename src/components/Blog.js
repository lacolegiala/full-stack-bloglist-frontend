/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemoveBlog, user }) => {
  const [showAll, setShowAll] = useState(false)
  const [text, setText] = useState('View all data')
  const [removed, setRemoved] = useState(false)

  const blogStyle = {
    paddingTop: 8,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 4
  }

  const clickableTitle = {
    background: 'none',
    border: 'none'
  }

  const handleClick = () => {
    setShowAll(!showAll)
    if (text === 'View all data') {
      setText('Hide')
    }
    else {
      setText('View all data')
    }
  }

  const like = async (event) => {
    event.preventDefault()
    handleLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user
    })
  }

  const removeBlog = async (event) => {
    if (window.confirm('Do you want to delete blog ' + blog.title + '?')) {
      event.preventDefault()
      handleRemoveBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id,
        user: blog.user
      })
      setRemoved(true)
    }
  }

  if (!removed) {
    return (
      <div className='bloglist' style={blogStyle}>
        <button id='title-button' className="link" style={clickableTitle} onClick={handleClick}>{blog.title}</button>
        {blog.author}
        <button onClick={handleClick}>{text}</button>
        {showAll === true &&
          <div>
            <ul>{blog.url}</ul>
            <ul>{blog.likes}
              <button onClick={like}>Like</button>
            </ul>
            <ul>{blog.user.username}</ul>
            {blog.user.username === user.username &&
              <button onClick={removeBlog}>Remove</button>
            }
          </div>}
      </div>
    )
  }
  else {
    return (<div></div>)
  }
}

export default Blog
