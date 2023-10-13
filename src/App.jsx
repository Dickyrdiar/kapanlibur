/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import moment from "moment"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/NavComponent"
import { countdownHoliday } from "./controller/countdownHoliday"
import 'moment/locale/id';
import CalendarList from "./components/CalendarList";
import Footer from "./components/Footer";
import { ControllerCalendar } from "./controller/controllerCalendar";

function App() {
  const { countDown, loading, isVisible } = countdownHoliday()
  const {
    listHoliday,
    handleNextMonth,
    handlePrevMonth,
    currentMonth,
    renderCalendar
  } = ControllerCalendar()
  moment.locale('id'); 
  const formattedDate = moment().format('l');

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
      <CalendarList
        handlePrevMonth={() => handlePrevMonth}
        handleNextMonth={() => handleNextMonth}
        currentMonth={currentMonth}
        renderCalendar={renderCalendar()}
        holidayList={listHoliday}
      />
      <Footer />
    </div>
  )
}

export default App
