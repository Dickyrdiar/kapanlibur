/* eslint-disable react/prop-types */
import Calendar from "../Calendar"
import ImageCalendar from '../../assets/image/calendar-icons2.png'

const CalendarList = ({ 
  handlePrevMonth,
  handleNextMonth,
  renderCalendar,
  currentMonth,
  holidayList
}) => {

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
            <div className="flex justify-between pt-8 py-8 w-5/6">
              <div>
                <Calendar 
                  handleNextMonth={handleNextMonth}
                  handlePrevMonth={handlePrevMonth}
                  renderCalendar={renderCalendar}
                  currentMonth={currentMonth}
                />
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="p-8">
                  <div className="md:flex-grow">
                    {holidayList === null && holidayList?.length !== 1 ? (
                      <div className="text-lg font-semibold">
                        <p className="mt-6 text-lg text-center leading-8 text-gray-600">
                          List Hari libur :
                        </p>
                        <img src={ImageCalendar} alt="image calendar" />
                      </div>
                    ) : (
                      <>
                      {holidayList?.map((val) => (
                        <>
                          <h5 className="text-2xl font-medium text-gray-900 title-font mb-2">
                            {val.name}
                          </h5>
                          <p className="leading-relaxed">
                            {val.date}
                          </p>
                        </>
                      ))}
                    </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarList