/* eslint-disable react-hooks/rules-of-hooks */

import useFetchHariLibur from "../customHook"

export const countdownHoliday = () => {
  const {data} = useFetchHariLibur({
    url: '/api',
    method: 'GET'
  })

  const filterNational = data?.filter((val) => val.is_national_holiday === true)

  return {filterNational}
}