import React from 'react'
import '../App.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="Notification">
      <strong>{message}</strong>
    </div>
  )
}


export default Notification