import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

axios.defaults.baseURL = import.meta.env.VITE_HOLIDAY_URL

const useFetchHariLibur = ({url, method}) => {
  const [data, setdata] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounthed = true

    const apiFetch = async () => {
      try {
        setLoading(true)
        const result = await axios.request({
          url,
          method
        })
  
        setdata(result.data)
      } catch (error) {
        setError(error.message)
      } finally {
        isMounthed && setLoading(false)
      }
    } 

    isMounthed && apiFetch()
  }, [method, url])

  return {data, loading, error}
}

export default useFetchHariLibur