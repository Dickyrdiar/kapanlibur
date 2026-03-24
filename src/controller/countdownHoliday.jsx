import { useEffect, useState } from "react"
import useFetchHariLibur from "../customHook"

export const useCountdownHoliday = () => {
  const [countDown, setCountdown] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Ambil data tahun sekarang
  const { data, loading, error } = useFetchHariLibur({
    year: new Date().getFullYear()
  })

  useEffect(() => {
    if (!data || data.length === 0) return

    const currentDate = new Date()

    // Normalisasi data Google Calendar ke format yang dibutuhkan
    const normalized = data.map((event) => ({
      holiday_date: event.start?.date,   // "YYYY-MM-DD"
      holiday_name: event.summary,
      is_national_holiday: true,
    }))

    // Urutkan ascending (terdekat duluan) lalu cari yang belum lewat
    const sorted = [...normalized].sort(
      (a, b) => new Date(a.holiday_date) - new Date(b.holiday_date)
    )

    const nextHoliday = sorted.find((holiday) => {
      const holidayDate = new Date(holiday.holiday_date)
      // Set jam ke 00:00:00 agar hari H tetap terhitung
      holidayDate.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return holidayDate >= today
    })

    if (!nextHoliday) return

    const holidayDate = new Date(nextHoliday.holiday_date)
    holidayDate.setHours(0, 0, 0, 0)

    // Cek apakah hari ini adalah hari libur
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (holidayDate.getTime() === today.getTime()) {
      setIsVisible(true)
    }

    // Set state awal sebelum interval berjalan
    const calcRemaining = () => {
      const now = new Date()
      const timeRemaining = holidayDate - now
      return {
        name: nextHoliday.holiday_name,
        date: holidayDate.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        timeRemaining,
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
      }
    }

    setCountdown(calcRemaining())

    const timer = setInterval(() => {
      const remaining = calcRemaining()
      if (remaining.timeRemaining <= 0) {
        clearInterval(timer)
        setIsVisible(true)
        setCountdown(null)
        return
      }
      setCountdown(remaining)
    }, 1000)

    // Cleanup: hentikan interval saat komponen unmount atau data berubah
    return () => clearInterval(timer)
  }, [data])

  return {
    countDown,
    loading,
    error,
    isVisible,
  }
}