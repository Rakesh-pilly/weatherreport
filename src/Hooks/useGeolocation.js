import { useState, useEffect } from "react"

export default function useGeolocation(options) {
  const [loadingLoc, setLoading] = useState(true)
  const [error, setError] = useState()
  const [dataLoc, setData] = useState({})

  useEffect(() => {
    const successHandler = e => {
      setLoading(false)
      setError(null)
      setData(e.coords)
    }
    const errorHandler = e => {
      setError(e)
      setLoading(false)
    }
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loadingLoc, error, dataLoc }
}