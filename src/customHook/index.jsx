import axios from "axios"
import { useEffect, useState } from "react"

const CALENDAR_ID = "en.indonesian#holiday@group.v.calendar.google.com"
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

console.log(import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY)

// Base URL Google Calendar API
axios.defaults.baseURL = "https://www.googleapis.com/calendar/v3/calendars"

const useFetchHariLibur = ({ year = new Date().getFullYear() }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const timeMin = new Date(year, 0, 1).toISOString()
    const timeMax = new Date(year, 11, 31, 23, 59, 59).toISOString()

    const url = `/${encodeURIComponent(CALENDAR_ID)}/events`

    const apiFetch = async () => {
      try {
        setLoading(true)
        const result = await axios.request({
          url,
          method: "GET",
          params: {
            key: API_KEY,
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
            maxResults: 100,
          },
        })

        if (isMounted) setData(result.data.items || [])
      } catch (error) {
        if (isMounted) setError(error.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    apiFetch()

    return () => {
      isMounted = false
    }
  }, [year])

  return { data, loading, error }
}

export default useFetchHariLibur