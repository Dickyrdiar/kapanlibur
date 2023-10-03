/* eslint-disable no-unused-vars */
import CalendarComponent from "../Calendar"

const CardLayout = () => {
  return (
    <div className="flex justify-center item-center mt-2">
      <div className="w-3/4 h-48 bg-white-300 shadow-lg tex-white p-4 mt-6 rounded">
        <div className="flex justify-between pt-8 py-8">
          <div>calendar</div>
          <div>list</div>
        </div>
      </div>
    </div>
  )
}

export default CardLayout