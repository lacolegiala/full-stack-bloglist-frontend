import React from 'react'
import { Link } from 'react-router-dom'

const User = (props) => {

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={'/users/' + user.id}>{user.name ? user.name : '(no name)'}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default User