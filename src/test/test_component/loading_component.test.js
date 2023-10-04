/* eslint-disable no-undef */
// const { default: Spinner } = require("@/src/components/Spinner")
import { Spinner } from '../../components/Spinner'
import {render} from '@testing-library/react'

test('renders loading component', () => {
  const { getBytestId } = render(<Spinner />)
  const loadElement = getBytestId('loading-element')
  expect(loadElement).toBeInTheDocument()
})