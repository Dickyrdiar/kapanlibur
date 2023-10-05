// const { useState } = require("react")
import { useState } from "react"

const Calendar = () => {
  const currentDate = new Date()
  const [currentMonth, setCurrentMonth] = useState(currentDate)
  

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextMonthDate = new Date(prevMonth)
      nextMonthDate.setMonth(prevMonth.getMonth() + 1)
      return nextMonthDate
    })
  }

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const prevMonthDate = new Date(prevMonth)
      prevMonthDate.setMonth(prevMonth.getMonth() - 1)
      return prevMonthDate
    })
  }

  const generateCalendar = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
    const calendar = []

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(<div key={`empty-${1}`} className="text-center"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      console.log("day", day)
      calendar.push(
        <div key={`day-${day}`} className="text-center py-2">
          {day}
        </div>
      )
    }
    return calendar
  }

  return (
    <div className="mx-auto mx-w-lg bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-between mb-4">
        <button
          className="px-2 py-1 text-sm font-semibold text-gray-600"
          onClick={prevMonth}
        >
          {'<'}
        </button>

        <h6 className="text-xl font-semibold">
          {new Intl.DateTimeFormat('id-ID', {month: 'long', year: 'numeric'}).format(currentMonth)}
        </h6>

        <button 
          className="px-2 py-1 text-sm font-semibold text-gray-600"
          onClick={nextMonth}
        >
          {'>'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
        ))}
        {generateCalendar()}
      </div>
    </div>
  )
}

export default Calendar