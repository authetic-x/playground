import { describe, expect, test, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from '~/components/accordion'

describe('Accordion test', () => {
  beforeEach(() => {
    render(<Accordion title='Testing'><h4>Content</h4></Accordion>)
  })

  test('should show title', () => {
    expect(screen.getByText(/Testing/i)).toBeDefined()
  })

  test('should not show the content at start', () => {
    expect(screen.queryByText(/Content/i)).toBeNull()
  })

  test('should show the content after click the button', async () => {
    const title = screen.getByText(/show/i)
    fireEvent.click(title)

    expect(await screen.findByText(/Content/i)).toBeDefined()
  })
})
