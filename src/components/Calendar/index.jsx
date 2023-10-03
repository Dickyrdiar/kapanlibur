/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { DayPicker } from 'react-day-picker'
// import 'react-day-picker/lib/style.css'
import './CustomDayPicker.css'



const CalendarComponent = () => {
  const [selected, setSelected] = useState()

  return (
    <div className="container mx-auto p-4">
      <DayPicker 
        className='w-full'
      />
    </div>
  )
}

export default CalendarComponent

// const DatePickerWrapperStyled = createGlobalStyle`
//   .date_picker.full-width {
//     width: 100%;
//   }
// `