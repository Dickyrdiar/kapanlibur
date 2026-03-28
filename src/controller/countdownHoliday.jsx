import { useEffect, useRef, useState } from "react"
import useFetchHariLibur from "../customHook"

export const useCountdownHoliday = () => {
  const [countDown, setCountdown] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState(null)

  const currentYear = useRef(new Date().getFullYear()).current
  const nextYear = currentYear + 1

  const { data: dataThisYear, loading: loadingThis } = useFetchHariLibur({ year: currentYear })
  const { data: dataNextYear, loading: loadingNext } = useFetchHariLibur({ year: nextYear })

  const loading = loadingThis || loadingNext

  // Simpan sorted holidays agar bisa diakses dari dalam timer tanpa re-render
  const sortedRef = useRef([])
  // Flag agar proses normalisasi hanya sekali setelah data masuk
  const isInitialized = useRef(false)
  const timerRef = useRef(null)

  // Fungsi cari dan mulai countdown ke liburan berikutnya
  const startCountdown = (sorted) => {
    // Bersihkan timer lama jika ada
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const nextHoliday = sorted.find((holiday) => {
      const holidayDate = new Date(holiday.holiday_date)
      holidayDate.setHours(0, 0, 0, 0)
      return holidayDate >= today
    })

    if (!nextHoliday) {
      setCountdown(null)
      return
    }

    const holidayDate = new Date(nextHoliday.holiday_date)
    holidayDate.setHours(0, 0, 0, 0)

    // Cek apakah hari ini hari libur
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

    // Set nilai awal langsung sebelum interval
    setCountdown(calcRemaining())

    // Mulai interval
    timerRef.current = setInterval(() => {
      const remaining = calcRemaining()

      if (remaining.timeRemaining <= 0) {
        clearInterval(timerRef.current)
        timerRef.current = null
        setIsVisible(true)
        setCountdown(null)

        // Cari liburan berikutnya dari sorted yang sudah ada
        const nowDay = new Date()
        nowDay.setHours(0, 0, 0, 0)

        const nextAfter = sortedRef.current.find((holiday) => {
          const d = new Date(holiday.holiday_date)
          d.setHours(0, 0, 0, 0)
          return d > nowDay
        })

        if (nextAfter) {
          // Tunggu sebentar lalu mulai countdown berikutnya
          setTimeout(() => {
            setIsVisible(false)
            startCountdown(sortedRef.current)
          }, 3000)
        }
        return
      }

      setCountdown(remaining)
    }, 1000)
  }

  useEffect(() => {
    // Tunggu kedua fetch selesai
    if (loadingThis || loadingNext) return
    if (!dataThisYear && !dataNextYear) return
    // Jangan proses ulang jika sudah diinisialisasi
    if (isInitialized.current) return

    const combined = [
      ...(dataThisYear || []),
      ...(dataNextYear || []),
    ]

    const normalized = combined
      .map((event) => ({
        holiday_date: event.start?.date,
        holiday_name: event.summary,
      }))
      .filter((event) => Boolean(event.holiday_date))

    if (normalized.length === 0) return

    const sorted = [...normalized].sort(
      (a, b) => new Date(a.holiday_date) - new Date(b.holiday_date)
    )

    // Simpan ke ref agar bisa diakses dari dalam timer
    sortedRef.current = sorted
    isInitialized.current = true

    startCountdown(sorted)
  }, [dataThisYear, dataNextYear, loadingThis, loadingNext])

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return {
    countDown,
    loading,
    error,
    isVisible,
  }
}