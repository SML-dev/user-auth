import react, { useEffect } from 'react'

export const Logout = () => {
  const test = async () => {
    const res = await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
    await res.json()
  }
  return (
    <div>
      <h1>logout</h1>
    </div>
  )
}
