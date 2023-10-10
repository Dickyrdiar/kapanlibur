import { useEffect } from "react"
import { useState } from "react"
import useFetchHariLibur from "../customHook"

export const countdownHoliday = () => {
  const [countDown, setCountdown] = useState(null)
  const [isVisible, setIsvisible] = useState(false)
  const {data, loading, error} = useFetchHariLibur({
    url: '/api',
    method: 'GET'
  })

  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() +1
    const currentYear = currentDate.getFullYear()
    const filterNational = data?.filter((val) => val.is_national_holiday === true)

    let nextHoliday = null
    for (const holiday of Object.values(filterNational || {})) {
      const holidayDate = new Date(holiday?.holiday_date)
      const holidayYear = holidayDate.getFullYear()
      const holidayMonth = holidayDate.getMonth() + 1

      if (holidayYear > currentYear || (holidayYear === currentYear && holidayMonth >= currentMonth)) {
        if (holidayDate > currentDate) {
          nextHoliday = holiday
          break;
        }
      } else if (holidayMonth > currentMonth) {
        nextHoliday = holiday
        break;
      }

    }

    if (nextHoliday) {
      const holidayDate = new Date(nextHoliday.holiday_date)
      const timeuntilHoliday = holidayDate - currentDate

      if (timeuntilHoliday <= 0) {
        setIsvisible(true)
      }

      setCountdown({
        name: nextHoliday.holiday_name,
        date: holidayDate.toLocaleString(),
        timeRemaining: timeuntilHoliday,
      })

      const timer = setInterval(() => {
        const timeRemaining = holidayDate - new Date()
        if (timeRemaining <= 0) {
          clearInterval(timer)
          setCountdown(null)
        } else {
          setCountdown((prevCountdown) => ({
            ...prevCountdown,
            days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),

          }))
        }
      }, 1000)
    }
  },[data])

  return {
    countDown,
    loading,
    error,
    isVisible
  }
}