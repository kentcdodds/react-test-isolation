import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../counter'

test('allows clicks until the maxClicks is reached, then requires a reset', () => {
  const {getByText} = render(<Counter maxClicks={4} initialCount={3} />)
  const counterButton = getByText(/^count/i)

  // the counter is initialized to the initialCount
  expect(counterButton).toHaveTextContent(/3/)

  // when clicked, the counter increments the click
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)

  // the counter button is disabled when it's hit the maxClicks
  expect(counterButton).toHaveAttribute('disabled')
  // the counter button no longer increments the count when clicked.
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)

  // the reset button has been rendered and is clickable
  fireEvent.click(getByText(/reset/i))

  // the counter is reset to the initialCount
  expect(counterButton).toHaveTextContent(/3/)

  // the counter can be clicked and increment the count again
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)
})
