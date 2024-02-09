import { useState, useEffect } from 'react'

export function useDebounce(value, delay) {
  const [debounceTerm, setDebounceTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTerm(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounceTerm
}
