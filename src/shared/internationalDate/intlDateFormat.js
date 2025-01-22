export function intlDateFormatId(date) {
  if (!date || isNaN(new Date(date).getTime())) {
    return "invalid Date"
  }

  const newDate = new Date(date)

  const options = {
    weekday: 'long', // Nama hari (Senin)
    year: 'numeric', // Tahun (2025)
    month: 'long',   // Bulan (Januari)
    day: 'numeric',  // Tanggal (27)
    hour12: true,   
  }

  const formatDate = new Intl.DateTimeFormat('id-ID', options).format(newDate)
  return formatDate
}