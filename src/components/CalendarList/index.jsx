/* eslint-disable react/prop-types */
import ImageCalendar from "../../assets/image/calendar-icons2.png";
import 'moment/locale/id';
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from "react-redux";
moment.locale('id');

const CalendarList = ({
  handlePrevMonth,
  handleNextMonth,
  currentMonth,
  holidayList,
}) => {
  moment.locale('id');
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`pb-10 mb-8 h-[400px] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Heading */}
      <div className="text-center my-6">
        <p className={`text-md ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Daftar Tanggal Merah:
        </p>
      </div>

      {/* Calendar Container */}
      <div className="flex justify-center px-4">
        <div className={`w-full max-w-md shadow-lg rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <FaChevronLeft
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} z-10 cursor-pointer`}
              onClick={handlePrevMonth}
            />

            <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              {currentMonth instanceof Date
                ? currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })
                : "Invalid Date"}
            </div>

            <FaChevronRight
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} z-10 cursor-pointer`}
              onClick={handleNextMonth}
            />
          </div>

          {/* Holiday List */}
          <div className="mt-8">
            {holidayList === null || holidayList.length === 0 ? (
              <div className="text-center">
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  List Hari Libur:
                </p>
                <img
                  src={ImageCalendar}
                  alt="calendar"
                  className="mx-auto w-24 h-24"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {holidayList.map((val, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <h5 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      {val.holiday_name}
                    </h5>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {moment(val.holiday_date).format("LL")}
                    </p>
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