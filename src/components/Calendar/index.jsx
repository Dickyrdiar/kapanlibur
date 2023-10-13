/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const Calendar = (
 { handlePrevmonth,
  handleNextMonth,
  renderCalendar,
  currentMonth}
) => {

  return (
    <div className="w-full max-w-md mx-auto md:w-360 h-640">
      <div className="flex justify-between mb-4 md: justify-center item center">
        <button className="cursor-pointer" onClick={() => handlePrevmonth}>{'<'}</button>
        <div>{currentMonth.toLocaleDateString('default', {month: 'long', year: 'numeric'})}</div>
        <button className="cursor-pointer" onClick={() => handleNextMonth}>{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar}</div>
    </div>
  );
};

export default Calendar;
