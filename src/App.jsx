/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import moment from "moment"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/NavComponent"
import { countdownHoliday } from "./controller/countdownHoliday"
import 'moment/locale/id';

function App() {
  const { countDown, loading, isVisible } = countdownHoliday()
  moment.locale('id'); // Set the locale to Indonesian
  const formattedDate = moment().format('l');
  console.log("isVisible", isVisible); // Example formatting
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
    </div>
  )
}

export default App
