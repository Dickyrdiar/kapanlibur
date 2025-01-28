/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import React, { useEffect } from "react";
import moment from "moment";
import 'moment/locale/id';
import 'antd/dist/reset.css';
import Dashboard from "./components/Dashboard";
import NavbarComponent from "./components/NavComponent";
import { countdownHoliday } from "./controller/countdownHoliday";
import CalendarList from "./components/CalendarList";
import Footer from "./components/Footer";
import { ControllerCalendar } from "./controller/controllerCalendar";
import { intlDateFormatId } from "./shared/internationalDate/intlDateFormat";

function App() {
  const { countDown, loading, isVisible } = countdownHoliday();
  const { listHoliday, handleNextMonth, handlePrevMonth, currentMonth, dayLeave } = ControllerCalendar();

  useEffect(() => {
    moment.locale('id');
    document.title = "KapanLibur - Planner of your Vacation days and Leave days";
  }, []);

  return (
    <>
      <NavbarComponent converty={isVisible} />
      <Dashboard
        timeNow={intlDateFormatId(new Date())}
        name={countDown?.name}
        date={intlDateFormatId(countDown?.date)}
        days={countDown?.days}
        hours={countDown?.hours}
        minutes={countDown?.minutes}
        seconds={countDown?.seconds}
        loading={loading}
      />
      <div className="mt-[-80px]">
        <CalendarList
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          currentMonth={currentMonth}
          holidayList={listHoliday}
          dayLeave={dayLeave}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;