/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from "react"
import { useState } from "react"
import useFetchHariLibur from "../customHook"
import { isEqual } from 'lodash'


export const ControllerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [listHoliday, setListholiday] = useState(null)
  const [dayLeave, setDayLeave] = useState(null)

  // Kirim tahun dari currentMonth agar data otomatis refresh saat ganti tahun
  const { data, loading, error } = useFetchHariLibur({
    year: currentMonth.getFullYear()
  })
// harus muncul value-nya, bukan undefined

  console.log("data", data)

  // Google Calendar API mengembalikan array event dengan field:
  // { id, summary, start: { date: "YYYY-MM-DD" }, end: { date: "YYYY-MM-DD" } }
  // Normalisasi ke format yang dipakai di controller ini
  const normalizedData = useMemo(() => {
    return data?.map((event) => ({
      ...event,
      holiday_date: event.start?.date,        // "YYYY-MM-DD"
      holiday_name: event.summary,            // nama hari libur
      is_national_holiday: true,              // semua event dari kalender ini adalah libur nasional
    })) || []
  }, [data])

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Filter berdasarkan bulan currentMonth
  const filteredResult = useMemo(() => {
    return normalizedData.filter((val) => {
      const holidayDate = new Date(val.holiday_date)
      return (
        holidayDate.getMonth() === currentMonth.getMonth() &&
        holidayDate.getFullYear() === currentMonth.getFullYear()
      )
    })
  }, [normalizedData, currentMonth])

  useEffect(() => {
    const adjustedHolidays = adjustHolidayDates(filteredResult)
    if (!isEqual(listHoliday, adjustedHolidays)) {
      setListholiday(adjustedHolidays)
      setDayLeave(
        adjustedHolidays.flatMap((val) => {
          const prevDay = new Date(val.prevDay)
          const nextDay = new Date(val.nextDay)
          const days = []
          if (prevDay.getDay() !== 0 && prevDay.getDay() !== 6) {
            days.push(val.prevDay)
          }
          if (nextDay.getDay() !== 0 && nextDay.getDay() !== 6) {
            days.push(val.nextDay)
          }
          return days
        })
      )
    }
  }, [filteredResult, listHoliday])

  const adjustHolidayDates = (holidays) => {
    return holidays?.map((val) => {
      const holidayDate = new Date(val.holiday_date)
      const prevDay = new Date(holidayDate)
      prevDay.setDate(holidayDate.getDate() - 1)
      const nextDay = new Date(holidayDate)
      nextDay.setDate(holidayDate.getDate() + 1)

      return {
        ...val,
        prevDay: prevDay.toISOString().split("T")[0],
        nextDay: nextDay.toISOString().split("T")[0],
      }
    })
  }

  return {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
    loading,
    error,
    dayLeave,
  }
}