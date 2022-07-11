import React, { useEffect, useState } from 'react'
import { UserEntity } from '../../../backend/types'

export const Welcome = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:5000/api/private', {
          credentials: 'include',
        })
        const info: UserEntity = await res.json()
        setUser(info.name)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return <h3> Welcome {user} on private page👍</h3>
}
