import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../counter'

function renderCounter(props) {
  const utils = render(<Counter maxClicks={4} initialCount={3} {...props} />)
  const counterButton = utils.getByText(/^count/i)
  return {...utils, counterButton}
}

test('the counter is initialized to the initialCount', () => {
  const {counterButton} = renderCounter()
  expect(counterButton).toHaveTextContent(/3/)
})

test('when clicked, the counter increments the click', () => {
  const {counterButton} = renderCounter()
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)
})

test(`the counter button is disabled when it's hit the maxClicks`, () => {
  const {counterButton} = renderCounter({
    maxClicks: 4,
    initialCount: 4,
  })
  expect(counterButton).toHaveAttribute('disabled')
})

test(`the counter button does not increment the count when clicked when it's hit the maxClicks`, () => {
  const {counterButton} = renderCounter({
    maxClicks: 4,
    initialCount: 4,
  })
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)
})

test(`the reset button has been rendered and resets the count when it's hit the maxClicks`, () => {
  const {getByText, counterButton} = renderCounter()
  fireEvent.click(counterButton)
  fireEvent.click(getByText(/reset/i))
  expect(counterButton).toHaveTextContent(/3/)
})
