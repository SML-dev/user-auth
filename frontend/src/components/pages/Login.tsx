import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RespFromBe } from '../../../../backend/types/respFromBe/respFromBe';
import { authAction } from '../../store';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const info: RespFromBe = await res.json();
      if (info.token) {
        dispatch(authAction.login());
        navigate('/user');
      }
      return toast.info(info.msg);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await sendRequest();
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
      <h2>login</h2>
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
          Already have account?<Link to='/register'> Register</Link>
        </span>
        <span>
          <Link to='/forgot-password'>Forgot your password?</Link>
        </span>
      </form>
    </div>
  );
};
