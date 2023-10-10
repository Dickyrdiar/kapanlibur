/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useState } from "react"
import useFetchHariLibur from "../customHook"

export const ControllerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [listHoliday, setListholiday] = useState(null)

  const {data, loading, error} = useFetchHariLibur({
    url: 'api',
    method: 'GET'
  })
  const filterNational = data?.filter((val) => val.is_national_holiday === true)
  
  const daysInMont = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const lastDay = new Date(year, month, 0).getDate()

    return lastDay
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const renderCalendar = () => {
    const totalDays = daysInMont()
    const calendarDays = []

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isHoliday = filterNational?.some((holiday) => holiday?.holiday_date === date?.toISOString().split('T')[0]);
      const isCurrentDay = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

      calendarDays.push(
        <div key={day}
          className={`p-2 text-center ${
            isHoliday ? 'bg-red-500 text-white' : isCurrentDay ? 'bg-gray-300' : ''
          }`}
        >
          <span>{day}</span>
        </div>
      )
    }

    return calendarDays
  }

  useEffect(() => {
    for (const val of Object.values(filterNational || {})) {
      const holidayDate = new Date(val?.holiday_name)
      const holidayMonth = holidayDate.getMonth() + 3

      let listHoliday = []
      if (currentMonth === holidayMonth) {
        listHoliday = {
          name: val.holiday_name,
          date: val.holiday_date
        }
        break;
      }

      setListholiday(listHoliday)
    }
  }, [])

  return {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    renderCalendar,
    currentMonth
  }
}