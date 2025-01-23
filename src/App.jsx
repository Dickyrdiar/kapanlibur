/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import React, { lazy, useEffect } from "react";
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
  const {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
  } = ControllerCalendar();


  useEffect(() => {
    document.title = "KapanLibur - Planner of your Vacation days and Leave days";
  }, []);

  return (
    <div>
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

      <div className="mt-[-70px]">
        <CalendarList
          handlePrevMonth={handlePrevMonth} 
          handleNextMonth={handleNextMonth} 
          currentMonth={currentMonth}
          holidayList={listHoliday}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;