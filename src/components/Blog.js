/* eslint-disable linebreak-style */
//Fix later
import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [showAll, setShowAll] = useState(false)
  const [text, setText] = useState('View all data')

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


  return (
    <div style={blogStyle}>
      <button className="link" style={clickableTitle} onClick={handleClick}>{blog.title}</button>
      {blog.author}
      <button onClick={handleClick}>{text}</button>
      {showAll === true &&
        <div>
          <ul>{blog.url}</ul>
          <ul>{blog.likes}
            <button onClick={like}>Like</button>
          </ul>
          <ul>{blog.user.username}</ul>
        </div>}
    </div>
  )
}

export default Blog
