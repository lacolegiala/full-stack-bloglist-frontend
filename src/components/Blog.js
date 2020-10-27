/* eslint-disable linebreak-style */
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 8,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 4
  }

  return (
    <div className='bloglist' style={blogStyle}>
      <Link to={'/blogs/' + blog.id}>{blog.title} {blog.author}</Link>
    </div>
  )
}

export default Blog
