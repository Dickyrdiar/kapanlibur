/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import React, { lazy, useEffect } from "react";
import moment from "moment";
import 'moment/locale/id'; // Impor locale Bahasa Indonesia
import 'antd/dist/reset.css'; // Impor gaya CSS Ant Design
import Dashboard from "./components/Dashboard";
import NavbarComponent from "./components/NavComponent";
import { countdownHoliday } from "./controller/countdownHoliday";
import CalendarList from "./components/CalendarList";
import Footer from "./components/Footer";
import { ControllerCalendar } from "./controller/controllerCalendar";

// Set locale global ke Bahasa Indonesia
moment.locale('id');

function App() {
  const { countDown, loading, isVisible } = countdownHoliday();
  const {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
  } = ControllerCalendar();

  // Format tanggal dengan locale 'id'
  const formattedDate = moment().format('ll');

  const DashboardComponent = lazy(() => import('./components/Dashboard'));
  useEffect(() => {
    document.title = "KapanLibur - Your Holiday Planner"
  }, [])

  return (
    <div>
      <NavbarComponent converty={isVisible} />
      <Dashboard
        timeNow={formattedDate} 
        name={countDown?.name}
        date={moment(countDown?.date).format('ll')}
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