import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { RespFromBe } from '../../../../backend/types/respFromBe/respFromBe'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const info: RespFromBe = await res.json()
      toast.success(info.msg)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeEmail = (e: ChangeEvent) => {
    setEmail((e.target as HTMLInputElement).value)
  }
  return (
    <div className='container'>
      <ToastContainer />
      <h2>Reset password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            minLength={6}
            maxLength={30}
            required
            onChange={handleChangeEmail}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
