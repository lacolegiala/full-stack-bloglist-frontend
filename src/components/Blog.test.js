import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders the right content', () => {
  const blog = {
    title: 'This is the best blog ever',
    author: 'Jane Doe',
    url: 'does.com',
    likes: 2
  }

  const component = render(
    <Blog blog={blog}></Blog>
  )

  expect(component.container).toHaveTextContent(
    'Jane Doe' && 'This is the best blog ever'
  )
})

test('renders url and likes when the button is clicked', async () => {
  const blog = {
    title: 'This is the best blog ever',
    author: 'Jane Doe',
    url: 'does.com',
    likes: 2,
    user: {
      username: 'hihii'
    }
  }

  const component = render(
    <Blog blog={blog}></Blog>
  )

  const button = component.getByText('View all data')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'does.com' && 2
  )
})