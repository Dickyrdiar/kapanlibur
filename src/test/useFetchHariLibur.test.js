const { renderHook } = require("@testing-library/react")
const { default: axios } = require("axios")
const { default: useFetchHariLibur } = require("../customHook")

jest.mock('axios')

describe('useFetcHArilibur', () => {
  it('should fetch data successfuly', async () => {
    axios.request.mockResolvedValue({ data: 'test data' })

    const {result, waitForNextUpdate} = renderHook(() => {
      useFetchHariLibur({ url: 'api', method: 'GET' })
    })

    expect(result.current?.loading).toBe(true)
    await waitForNextUpdate()

    expect(result.current.data).toBe('test data')
    expect(result.data.error).toBe('')
    expect(result.current.loading).toBe(false)
  })

  it('should handle error', async () => {
    axios.request.mockRejectedValue(new Error('Test error'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchHariLibur({ url: '/example', method: 'GET' })
    );

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate(); // Wait for the hook to complete

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Test error');
    expect(result.current.loading).toBe(false);
  })
})