/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import moment from "moment"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/NavComponent"
import { countdownHoliday } from "./controller/countdownHoliday"
import 'moment/locale/id';

function App() {
  const { countDown } = countdownHoliday()
  moment.locale('id'); // Set the locale to Indonesian
  const formattedDate = moment().format('l'); // Example formatting
  return (
    <div>
      <NavbarComponent />
      <Dashboard 
        timeNow={formattedDate} 
        name={countDown?.name}
        date={moment(countDown?.date).format('ll')}
        days={countDown?.days}
        hours={countDown?.hours}
        minutes={countDown?.minutes}
        seconds={countDown?.seconds}
      />
      {/* <div className="mt-6">
        <CardLayout />
      </div> */}
    </div>
  )
}

export default App
