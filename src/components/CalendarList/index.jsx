/* eslint-disable react/prop-types */
import Calendar from "../Calendar"
import List from "../HolidayList"

const CalendarList = ({ 
  handlePrevMonth,
  handleNextMonth,
  renderCalendar,
  currentMonth,
  holidayList
}) => {

  console.log(holidayList === null);

  return (
    <>
      <div className="pb-10 mb-10">
        <div className="flex justify-center item-center">
          <p className="mt-6 text-md leading-8 text-gray-600">
            Daftar Tanggal Merah :
          </p>
        </div>
        <div className="flex justify-center item-center  lg:px-8">
          <div className="w-2/4 h-1/4 pt-8 bg-white-300 shadow-lg tex-white p-4 mt-1 rounded">
            <div className="flex justify-between pt-8 py-8">
              <div>
                <Calendar 
                  handleNextMonth={handleNextMonth}
                  handlePrevMonth={handlePrevMonth}
                  renderCalendar={renderCalendar}
                  currentMonth={currentMonth}
                />
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <List 
                  Lists={holidayList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarList