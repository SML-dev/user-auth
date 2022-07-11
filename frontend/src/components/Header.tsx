import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction, LoginState } from '../store';

export const Header = () => {
  const isLoggedIn = useSelector((state: LoginState) => state.isLoggedIn);

  const dispatch = useDispatch();
  const logoutReq = async () => {
    const res = await fetch('localhost:5000/api/logout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    });
    if (res.status === 200) {
      return res;
    }
    return new Error('Please try again');
  };

  const handleLogout = () => logoutReq().then(() => dispatch(authAction.logout()));

  return (
    <div>
      <AppBar style={{ backgroundColor: '#0288d1' }}>
        <Toolbar>
          <Typography variant='h4'>MegaK Project</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            {!isLoggedIn && (
              <Tabs
                indicatorColor='secondary'
                value={window.location.pathname === '/register' ? 1 : 0}
                textColor='inherit'>
                <Tab component='a' href='/login' label='LOGIN' />
                <Tab component='a' href='/register' label='REGISTER' />
              </Tabs>
            )}
            {isLoggedIn && (
              <Tabs indicatorColor='secondary' value={0} textColor='inherit'>
                <Tab onClick={handleLogout} component='a' href='/logout' label='LOGOUT' />
              </Tabs>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
