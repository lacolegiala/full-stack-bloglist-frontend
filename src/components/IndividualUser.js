import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const IndividualUser = () => {
  const [ user, setUser ] = useState(undefined)

  const { id } = useParams()


  useEffect(() => {
    (async () => {
      setUser(await userService.getOne(id))
    })()
  }, [])

  return (
    <div>
      {user !== undefined  &&
        <div>
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </div>
      }
      {user === undefined &&
        <div>
          Loading
        </div>
      }
    </div>
  )
}

export default IndividualUser