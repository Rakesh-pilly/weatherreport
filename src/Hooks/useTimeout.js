import { useCallback, useEffect, useRef, useState } from "react"

export default function useTimeout(callback, delay) {

  const [runing, setRuning] = useState(false);
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    setRuning(true);
    timeoutRef.current = setTimeout(() => {
      callbackRef.current()
      setRuning(false)
    }, delay)
  }, [delay])

  const clear = useCallback(() => {
    setRuning(false);

    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear, runing }
}