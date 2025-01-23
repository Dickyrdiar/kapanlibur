/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from "react"
import { useState } from "react"
import useFetchHariLibur from "../customHook"
import { isEqual } from 'lodash'; 


export const ControllerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [listHoliday, setListholiday] = useState(null)
  const [dayLeave, setDayLeave] = useState(null)

  const {data, loading, error} = useFetchHariLibur({
    url: 'api',
    method: 'GET'
  })

  const filterNational = data?.filter((val) => val?.is_national_holiday === true).reverse()
  // const year = new Date().getFullYear()
  // const month = new Date().getMonth() + 1
  // const getAllDates = getDatesInMonth(year, month)

  // const excludeDates = listHoliday
  // const filterexcludedate = getAllDates.filter(date => !excludeDates?.includes(date))
  // console.log("filter", listHoliday?.map((val) => val.holiday_date - 1))
 
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const filteredResult = useMemo(() => {
    return filterNational?.filter((val) => {
      const holidayDate = new Date(val?.holiday_date);
      return holidayDate.getMonth() === currentMonth.getMonth();
    }) || [];
  }, [filterNational]);

  useEffect(() => {
    if (!isEqual(listHoliday, filteredResult)) {
      setListholiday(filteredResult)
    }
  }, [filteredResult])

  const adjustHolidayDates = (holiday) => {
    return holiday?.map((val) => {
      const holidayDate = new Date(val?.holiday_date)
      const prevDay = new Date(holidayDate)
      prevDay.setDate(holidayDate.getDate() - 1); // Subtract 1 day
      const nextDay = new Date(holidayDate);
      nextDay.setDate(holidayDate.getDate() + 1); // Add 1 day

      return {
        ...holiday,
        prevDay: prevDay.toISOString().split("T")[0], // Format as YYYY-MM-DD
        nextDay: nextDay.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };
    })
  }


  return {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
    loading,
    error
  }
}