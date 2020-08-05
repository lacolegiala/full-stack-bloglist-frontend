import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div class="alert">
      <strong>{message}</strong>
    </div>
  )
}


export default Notification