import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { RespFromBe } from '../../../../backend/types/respFromBe/respFromBe'

export const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const { token } = useParams()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      const info: RespFromBe = await res.json()
      console.log(info)
      toast.info(info.msg)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangePassword = (e: ChangeEvent) => {
    setPassword((e.target as HTMLInputElement).value)
  }
  return (
    <div className='container'>
      <ToastContainer />
      <h2>Change password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            minLength={6}
            maxLength={50}
            required
            onChange={handleChangePassword}
          />
        </div>
        <span>
          You want to back to Login Page?<Link to='/login'> Login</Link>
        </span>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
