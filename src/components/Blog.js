/* eslint-disable linebreak-style */
//Fix later
import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const [text, setText] = useState('View')

  const handleClick = () => {
    setShowAll(!showAll)
    if (text === 'View') {
      setText('Hide')
    }
    else {
      setText('View')
    }
  }

  return (
    <div>
      {blog.title} {blog.author}
      <button onClick={handleClick}>{text}</button>
      {showAll === true && <div>{blog.url} {blog.likes}</div>}
    </div>
  )
}

export default Blog
