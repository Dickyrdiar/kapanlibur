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

  
  const daysInMont = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const lastDay = new Date(year, month, 0).getDate()

    return lastDay
  }


  // const renderCalendar = () => {
  //   const totalDays = daysInMont()
  //   const calendarDays = []

  //   const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  //   const renderDaysNames = () => {
  //     return (
  //       <div className="flex">
  //         {daysOfWeek?.map((dayName, index) => (
  //           <div key={index} className="flex-1 p-2 text-center font-bold">
  //             {dayName}
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   }

  //   const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  //   const offset = (3 - firstDayOfMonth + 7) % 7
  //   for (let i = 0; i < offset; i++) {
  //     calendarDays.push(
  //       <div key={`empty-${i}`} className="p-2 text-center">

  //       </div>
  //     )
  //   }

  //   for (let day = 1; day <= totalDays; day++) {
  //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day + 1);
  //     const isHoliday = filterNational?.some((holiday) => holiday?.holiday_date === date?.toISOString().split('T')[0]);
  //     const isCurrentDay = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

  //     calendarDays.push(
  //       <div key={day}
  //         className={`p-2 text-center full ${
  //           isHoliday ? 'bg-red-600 rounded-md text-white' : isCurrentDay ? 'bg-gray-300 rounded-md' : ''
  //         }`}
  //       >
  //         <span>{day}</span>
  //         <br />
  //         {/* <span className="text-sm">{dayOfWeek}</span> Tampilkan nama hari */}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="items-center">
  //       {renderDaysNames()}
  //       <div className="grid grid-cols-7  w-[250px] gap-1">{calendarDays}</div>
  //     </div>
  //   )
  // }

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

  console.log("current month", currentMonth);

  return {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
    loading,
    error
  }
}