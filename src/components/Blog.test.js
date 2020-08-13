import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
    'This is the best blog ever Jane Doe'
  )
})