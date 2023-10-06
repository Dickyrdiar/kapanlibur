/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import moment from "moment"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/NavComponent"
import { countdownHoliday } from "./controller/countdownHoliday"
import 'moment/locale/id';
import CalendarList from "./components/CalendarList";
import Footer from "./components/Footer";
import { lazy } from "react";

function App() {
  const { countDown, loading, isVisible } = countdownHoliday()
  moment.locale('id'); 
  const formattedDate = moment().format('l');
 

  const DashboardPage = lazy(() => import('./components/Dashboard'))
  console.log("dahsboard", DashboardPage);

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
      <CalendarList />
      <Footer />
    </div>
  )
}

export default App
