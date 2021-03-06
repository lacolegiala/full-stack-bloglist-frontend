import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'

const IndividualBlog = (props) => {
  const [ blog, setBlog ] = useState(undefined)
  const [ comments, setComments ] = useState([])
  const [ newComment, setNewComment ] = useState('')
  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    async function getBlog () {
      setBlog(await blogService.getOne(id))
      setComments(await blogService.getComments(id))
    }
    getBlog()
  }, [id, newComment])

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

  const addComment = async (event) => {
    try {
      event.preventDefault()
      const comment = { text: newComment }
      const commentToAdd = await blogService.addComment(blog.id, comment)
      setComments(comments.concat(commentToAdd))
      setNewComment('')
    } catch (error) {
      alert('Comment could not be added for some reason')
      console.log(error)
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
          <h2>comments</h2>
          <form onSubmit={addComment}>
            <input
              id='comment'
              type='text'
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
            ></input>
            <button id='add-comment' type='submit'>Add a new comment</button>
          </form>
          {comments.length > 0 &&
            <div>
              {comments.map(comment =>
                <li key={comment.id}>{comment.text}</li>
              )}
            </div>
          }
          {comments.length === 0 &&
            <div>No comments yet</div>
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