/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

const Dashboard = ({ timeNow, name, date, days, hours, minutes, seconds, loading }) => {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`relative isolate px-3 lg:px-8 h-[500px] ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] ${
            theme === "dark" ? "bg-gradient-to-tr from-[#4a5568] to-[#2d3748]" : "bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          } opacity-30`}
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        />
      </div>

      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
        <div className="sm:mb-6 sm:flex sm:justify-center">
          <div className={`rounded-full px-3 py-1 text-sm ring-1 ${theme === "dark" ? "text-gray-300 ring-gray-700" : "text-gray-600 ring-gray-900/10"}`}>
            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Hari ini: {timeNow}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Liburan Selanjutnya:
          </p>
          {loading ? (
            <div className="my-6"><Spinner /></div>
          ) : (
            <>
              <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} sm:text-4xl`}>
                {name}
              </h1>
              <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {date}
              </p>
              <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                {days}{t("day")}, {hours}{t("hour")}, {minutes}{t("minutes")}, {seconds}{t("second")}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-8rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className={`relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 ${
            theme === "dark" ? "bg-gradient-to-tr from-[#4a5568] to-[#2d3748]" : "bg-gradient-to-tr from-[#7b4079] to-[#5a54ae]"
          } opacity-30`}
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        />
      </div>
    </div>
  );
};

export default Dashboard;