import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
      navigate('/login')
    })()
  }, [])

  return <></>
}
