import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../counter'

let getByText, counterButton

beforeEach(() => {
  const utils = render(<Counter maxClicks={4} initialCount={3} />)
  getByText = utils.getByText
  counterButton = utils.getByText(/^count/i)
})

test('the counter is initialized to the initialCount', () => {
  expect(counterButton).toHaveTextContent(/3/)
})

test('when clicked, the counter increments the click', () => {
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)
})

test(`the counter button is disabled when it's hit the maxClicks`, () => {
  fireEvent.click(counterButton)
  expect(counterButton).toHaveAttribute('disabled')
})

test(`the counter button does not increment the count when clicked when it's hit the maxClicks`, () => {
  fireEvent.click(counterButton)
  fireEvent.click(counterButton)
  expect(counterButton).toHaveTextContent(/4/)
})

test(`the reset button has been rendered and resets the count when it's hit the maxClicks`, () => {
  fireEvent.click(counterButton)
  fireEvent.click(getByText(/reset/i))
  expect(counterButton).toHaveTextContent(/3/)
})
