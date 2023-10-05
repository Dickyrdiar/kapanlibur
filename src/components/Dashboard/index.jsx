/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


// import { useTheme } from "./src/context/themeContext"
import Calendar from "../Calendar"
import DatePicker from "../Calendar"
import Spinner from "../Spinner"

/* eslint-disable react/no-unknown-property */
const Dashboard = ({
  timeNow, 
  name, 
  date,
  days,
  hours,
  minutes,
  seconds,
  loading
}) => {
  // const [isDarkTheme] = useTheme()

  return(
    <div className="relative isolate px-3 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <p className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Hari ini Tanggal: {timeNow}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Liburan Selanjutnya :
          </p>
            <>
              {loading ? (
                <div className="mb-10">
                  <Spinner />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold trancking-light text-gray-900 sm:text-6xl">
                    {name}
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {date}
                  </p>

                  <p className="mt-6 text-lg leading-8 text-gray-800 ">
                    <span>{days} Hari,</span>  <span>{hours} Jam,</span>  <span>{minutes} Menit,</span> <span>{seconds} Detik</span> 
                  </p>
                </>
              )}
            </>
          
        </div>
      </div>

      <div 
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        area-hidden="true"
      >
        <div 
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7b4079] to-[#5a54ae] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        >
        </div>
      </div>

      <div className="flex justify-center item-center  lg:px-8">
        <div className="w-2/4 h-1/4 pt-8 bg-white-300 shadow-lg tex-white p-4 mt-1 rounded">
          <div className="flex justify-between pt-8 py-8">
            <div>
              <Calendar />
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">list</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard