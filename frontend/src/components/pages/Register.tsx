import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RespFromBe } from '../../../../backend/types/respFromBe/respFromBe';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/register`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      const info: RespFromBe = await res.json();
      toast(info.msg);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeName = (e: ChangeEvent) => {
    setName((e.target as HTMLInputElement).value);
  };
  const handleChangeEmail = (e: ChangeEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };
  const handleChangePassword = (e: ChangeEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };
  return (
    <div className='container'>
      <ToastContainer />
      <h2>register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            minLength={4}
            maxLength={20}
            required
            onChange={handleChangeName}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            minLength={6}
            maxLength={30}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            minLength={6}
            maxLength={50}
            onChange={handleChangePassword}
          />
        </div>
        <button type='submit'>Submit</button>
        <span>
          Already have account?<Link to='/login'> Login</Link>
        </span>
      </form>
    </div>
  );
};
