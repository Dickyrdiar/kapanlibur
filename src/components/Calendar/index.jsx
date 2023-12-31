const Calendar = (
 { handlePrevmonth,
  handleNextMonth,
  renderCalendar,
  currentMonth}
) => {

  return (
    <div className="w-full max-w-md mx-auto md:w-360 h-640">
      <div className="flex justify-between mb-4 md: justify-center item center">
        <button className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-white" onClick={handlePrevmonth}>{'<'}</button>
        <div>{currentMonth.toLocaleDateString('default', {month: 'long', year: 'numeric'})}</div>
        <button className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-white" onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar}</div>
    </div>
  );
};

export default Calendar;
