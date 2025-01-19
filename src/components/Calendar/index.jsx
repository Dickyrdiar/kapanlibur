import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = ({
  handlePrevMonth,
  handleNextMonth,
  renderCalendar,
  currentMonth,
}) => {
  return (
    <div className="w-full max-w-md mx-auto md:w-360 h-640">
      {/* Month Navigation */}
      <div className="flex items-center justify-center mb-4 space-x-4">
        <button
          className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handlePrevMonth}
        >
          <FaChevronLeft />
        </button>
        <div className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button
          className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleNextMonth}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar}
      </div>
    </div>
  );
};

export default Calendar;