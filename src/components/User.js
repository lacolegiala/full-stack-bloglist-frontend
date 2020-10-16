import React from 'react'

const User = (props) => {

  return (
    <table>
      <tbody>
        {props.users.map(user =>
          <tr key={user.id}>
            <td>
              {user.name}
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