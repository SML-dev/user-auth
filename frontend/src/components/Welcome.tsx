import React, { useEffect, useState } from 'react';
import { UserEntity } from '../../../backend/types';

let firstRender = true;

export const Welcome = () => {
  const [user, setUser] = useState('');

  (async () => {
    try {
      const res = await fetch('http://localhost:5000/api/refresh', {
        credentials: 'include',
      });
      const data: UserEntity = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  })();

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      (async () => {
        try {
          const res = await fetch('http://localhost:5000/api/private', {
            credentials: 'include',
          });
          const data: UserEntity = await res.json();
          setUser(data.name);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    let interval = setInterval(() => {
      (async () => {
        try {
          const res = await fetch('http://localhost:5000/api/refresh', {
            credentials: 'include',
          });
          const data: UserEntity = await res.json();
          setUser(data.name);
        } catch (err) {
          console.log(err);
        }
      })();
    }, 1000 * 28);
    return () => clearInterval(interval);
  }, []);

  return <h3> Welcome {user} on private page👍</h3>;
};
