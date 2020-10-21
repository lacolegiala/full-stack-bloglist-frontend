import React from 'react'

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
              {user.name ? user.name : '(no name)'}
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