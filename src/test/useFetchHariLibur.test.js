// const { renderHook } = require("@testing-library/react");
// const { default: axios } = require("axios");
// const { default: useFetchHariLibur } = require("../customHook");
import { renderHook } from '@testing-library/react'
import { axios } from 'axios'
import { useFetchHariLibur } from '../customHook'

jest.mock('axios')

describe('useFetchHariLibur', () => {
  it('fetch data successfully', async () => {
    const responseData = {data: 'mock data'};
    axios.request.mockResolvedValueOnce(responseData)

    const { result, waitForNextUpdate } = renderHook(() => useFetchHariLibur({ url: '/some-url', method: 'GET' }))
    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(responseData.data)
    expect(result.current.error).toBe('')
  })

  it('handle error', async () => {
    const errorMessage = 'an error occured';
    axios.request.mockRejecedValueOnce(new Error(errorMessage))

    const { result, waitForNextUpdate } = renderHook(() => useFetchHariLibur({ url: 'api', method: 'GET' }))
    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(errorMessage)
  })
})