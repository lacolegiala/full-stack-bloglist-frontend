import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'

const IndividualBlog = (props) => {
  const [ blog, setBlog ] = useState(undefined)
  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    async function getBlog () {
      setBlog(await blogService.getOne(id))
    }
    getBlog()
  }, [id])

  const like = async (event) => {
    event.preventDefault()
    props.handleLike({
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
      props.handleRemoveBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id,
        user: blog.user
      })
      history.replace('/blogs')
    }
  }


  return (
    <div>
      {blog !== undefined &&
        <div>
          <h2>
            {blog.title}
          </h2>
          <ul>
            <a href={`https://${blog.url}`}>{blog.url}</a>
          </ul>
          <ul>
            {blog.likes} likes
            <button onClick={like}>Like</button>
          </ul>
          <ul>
            Added by {blog.user.name}
          </ul>
          {blog.user.username === props.user.username &&
            <ul>
              <button onClick={removeBlog}>Remove</button>
            </ul>
          }
        </div>
      }
      {blog === undefined &&
        <div> Loading </div>
      }
    </div>
  )
}

export default IndividualBlog