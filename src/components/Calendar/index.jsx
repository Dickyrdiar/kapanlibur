/* eslint-disable react/prop-types */
import { useState } from "react";

const Calendar = ({ holidays }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth();
    const calendarDays = [];

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isHoliday = holidays?.some((holiday) => holiday?.holiday_date === date?.toISOString().split('T')[0]);
      const isCurrentDay = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

      calendarDays.push(
        <div
          key={day}
          className={`p-2 text-center ${
            isHoliday ? 'bg-red-500 text-white' : isCurrentDay ? 'bg-gray-300' : ''
          }`}
        >
          <span>{day}</span>
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevMonth}>{'<'}</button>
        <div>{currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
