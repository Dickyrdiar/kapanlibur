/* eslint-disable react/prop-types */
import Calendar from "../Calendar";
import ImageCalendar from "../../assets/image/calendar-icons2.png";
import 'moment/locale/id';
import moment from "moment";


const CalendarList = ({
  handlePrevMonth,
  handleNextMonth,
  renderCalendar,
  currentMonth,
  holidayList,
}) => {
  moment.locale('id')

  return (
    <div className="pb-10 mb-[30px]">
      {/* Heading */}
      <div className="flex justify-center items-center">
        <p className="mt-6 text-md leading-8 text-gray-600">
          Daftar Tanggal Merah:
        </p>
      </div>

      {/* Calendar Container */}
      <div className="flex justify-center lg:px-8">
        <div className="w-[400px] bg-white shadow-lg rounded-lg p-4 mt-1">
          {/* Calendar Component */}
          <div className="flex justify-center pt-8">
            <Calendar
              handleNextMonth={handleNextMonth}
              handlePrevMonth={handlePrevMonth}
              renderCalendar={renderCalendar}
              currentMonth={currentMonth}
            />
          </div>

          {/* Holiday List */}
          <div className="mt-8">
            {holidayList === null || holidayList?.length === 0 ? (
              <div className="text-center">
                <p className="text-lg leading-8 text-gray-600">
                  List Hari Libur:
                </p>
                <img
                  src={ImageCalendar}
                  alt="calendar"
                  className="mx-auto mt-4"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {holidayList?.map((val, index) => (
                  <div key={index} className="text-center">
                    <h5 className="text-2xl font-medium text-gray-900">
                      {val.name}
                    </h5>
                    <p className="text-gray-600">{val.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarList;