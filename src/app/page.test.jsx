/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Page from './page'

const useFormState = jest.fn();

it('App Router: Works with Server Components', () => {
  render(<Page />)
  expect(screen.getByTestId('heading')).toHaveTextContent('Encuesta electoral')
})