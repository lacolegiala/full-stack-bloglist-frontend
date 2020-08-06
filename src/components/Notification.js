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

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="ErrorNotification">
      <strong>{message}</strong>
    </div>
  )
}


export default {Notification, ErrorNotification}