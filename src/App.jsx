/* eslint-disable react/no-unknown-property */

import moment from "moment"
import CardLayout from "./components/CardLayout"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/NavComponent"
import { countdownHoliday } from "./controller/countdownHoliday"
// import { ControllerCountdown } from "./customHook/countdownHoliday"

function App() {
  const {filterNational} = countdownHoliday()
  moment.locale('id')
  const Now = new Date()

  console.log("filter", filterNational)

  return (
    <div>
      <NavbarComponent />
      <Dashboard timeNow={moment(Now).local('id').format('LL')} />
      <CardLayout />
    </div>
  )
}

export default App
