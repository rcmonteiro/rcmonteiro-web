import '@/shared/dayjs'
import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Home from './page'

describe('Home (e2e)', () => {
  it('should be able to render the home page with 5 posts ', async () => {
    render(await Home())
    const postItems = screen.getAllByTestId('post-item')
    expect(postItems.length).toBe(4)
  })
})
