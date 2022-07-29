import { useEffect } from "react"
import useTimeout from "./useTimeout"

export default function useDebounce(callback, delay, dependencies) {
  const { reset, clear ,runing } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])


  return {runing}

}