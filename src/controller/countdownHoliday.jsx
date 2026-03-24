import { useEffect, useRef, useState } from "react"
import useFetchHariLibur from "../customHook"

export const useCountdownHoliday = () => {
  const [countDown, setCountdown] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const currentYear = useRef(new Date().getFullYear()).current
  const nextYear = currentYear + 1

  // Fetch tahun ini dan tahun depan sekaligus
  // agar saat semua liburan tahun ini habis, otomatis lanjut ke tahun depan
  const { data: dataThisYear, loading: loadingThis } = useFetchHariLibur({ year: currentYear })
  const { data: dataNextYear, loading: loadingNext } = useFetchHariLibur({ year: nextYear })

  const loading = loadingThis || loadingNext
  const [error, setError] = useState(null)

  const prevDataRef = useRef(null)

  useEffect(() => {
    // Tunggu kedua fetch selesai
    if (loadingThis || loadingNext) return
    if (!dataThisYear && !dataNextYear) return

    // Gabung data dua tahun
    const combined = [
      ...(dataThisYear || []),
      ...(dataNextYear || []),
    ]

    // Cegah re-proses jika referensi tidak berubah
    if (prevDataRef.current === combined) return
    prevDataRef.current = combined

    // Normalisasi & filter event yang punya tanggal
    const normalized = combined
      .map((event) => ({
        holiday_date: event.start?.date,   // "YYYY-MM-DD"
        holiday_name: event.summary,
      }))
      .filter((event) => Boolean(event.holiday_date))

    if (normalized.length === 0) return

    // Urutkan ascending
    const sorted = [...normalized].sort(
      (a, b) => new Date(a.holiday_date) - new Date(b.holiday_date)
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Cari liburan pertama yang >= hari ini (otomatis lintas bulan & tahun)
    const nextHoliday = sorted.find((holiday) => {
      const holidayDate = new Date(holiday.holiday_date)
      holidayDate.setHours(0, 0, 0, 0)
      return holidayDate >= today
    })

    if (!nextHoliday) return

    const holidayDate = new Date(nextHoliday.holiday_date)
    holidayDate.setHours(0, 0, 0, 0)

    // Jika hari ini adalah hari libur
    if (holidayDate.getTime() === today.getTime()) {
      setIsVisible(true)
    }

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
        days:    Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24))),
        hours:   Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((timeRemaining % (1000 * 60)) / 1000)),
      }
    }

    setCountdown(calcRemaining())

    const timer = setInterval(() => {
      const remaining = calcRemaining()

      if (remaining.timeRemaining <= 0) {
        // Liburan hari ini tiba — tandai visible lalu cari liburan berikutnya
        clearInterval(timer)
        setIsVisible(true)

        // Cari liburan selanjutnya setelah yang baru saja tiba
        const afterToday = sorted.filter((holiday) => {
          const d = new Date(holiday.holiday_date)
          d.setHours(0, 0, 0, 0)
          return d > today
        })

        if (afterToday.length > 0) {
          // Reset prevDataRef agar useEffect tidak di-skip
          prevDataRef.current = null
          setIsVisible(false)
        } else {
          setCountdown(null)
        }
        return
      }

      setCountdown(remaining)
    }, 1000)

    return () => clearInterval(timer)
  }, [dataThisYear, dataNextYear, loadingThis, loadingNext])

  return {
    countDown,
    loading,
    error,
    isVisible,
  }
}