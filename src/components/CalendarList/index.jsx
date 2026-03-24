/* eslint-disable react/prop-types */
import ImageCalendar from "../../assets/image/calendar-icons2.png";
import 'moment/locale/id';
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useState } from "react";
import { intlDateFormatId } from "../../shared/internationalDate/intlDateFormat";
moment.locale('id');

const CalendarList = ({
  handlePrevMonth,
  handleNextMonth,
  currentMonth,
  holidayList,
  dayLeave
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const [isDisabled] = useState(false);
  
  // Date validation helpers
  const isCurrentYearMinusOne = moment(currentMonth).year() === moment().year() - 1;
  const isDecember = moment(currentMonth).month() === 11;

  return (
    <div className={`min-h-screen relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-4 sm:p-6`}>
      {/* Gradient Background */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] ${
            theme === "dark"
              ? "bg-gradient-to-tr from-[#4a5568] to-[#2d3748]"
              : "bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          } opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`}
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* Heading */}
      <div className="text-center mb-8 relative z-10">
        <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Daftar Tanggal Merah
        </p>
      </div>

      {/* Calendar Container */}
      <div className="flex justify-center relative z-10">
        <div className={`w-full max-w-3xl rounded-xl shadow-xl ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
        } p-6`}>
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-8 px-2">
            <button
              onClick={isCurrentYearMinusOne ? undefined : handlePrevMonth}
              disabled={isCurrentYearMinusOne}
              className={`p-2 rounded-lg ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 disabled:opacity-40' 
                  : 'hover:bg-gray-100 disabled:opacity-40'
              } transition-colors`}
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-center mx-4">
              {moment(currentMonth).format('MMMM YYYY')}
            </h2>

            <button
              onClick={isDecember ? undefined : handleNextMonth}
              disabled={isDecember}
              className={`p-2 rounded-lg ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 disabled:opacity-40' 
                  : 'hover:bg-gray-100 disabled:opacity-40'
              } transition-colors`}
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space">
            {(!holidayList?.length && !dayLeave?.length) ? (
              <div className="py-12 text-center">
                <img
                  src={ImageCalendar}
                  alt="No events"
                  className="mx-auto w-32 h-32 opacity-75 mb-4"
                />
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Tidak ada acara yang terjadwal
                </p>
              </div>
            ) : (
            <div className="grid md:grid-cols-2 gap-8 justify-center">
              <div className="flex flex-col items-center w-full">
    <h3
      className={`text-lg font-medium mb-4 text-center ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      Hari Libur
                </h3>

                <div className="flex flex-wrap gap-3 justify-center w-full">
                  {holidayList?.map((val, index) => (
                    <div
                      key={index}
                      className={`w-40 p-4 rounded-lg transition-colors text-center ${
                        theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium text-sm">
                        {val.holiday_name}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {intlDateFormatId(val.holiday_date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
