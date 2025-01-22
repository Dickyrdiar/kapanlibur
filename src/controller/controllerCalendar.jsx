/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from "react"
import { useState } from "react"
import useFetchHariLibur from "../customHook"
import { isEqual } from 'lodash'; 


export const ControllerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [listHoliday, setListholiday] = useState(null)

  const {data, loading, error} = useFetchHariLibur({
    url: 'api',
    method: 'GET'
  })

  const filterNational = data?.filter((val) => val?.is_national_holiday === true).reverse()

  const handlePrevMonth = () => {
    console.log("Previous month button clicked");
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    console.log("Next month button clicked");
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


  return {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
    loading,
    error
  }
}