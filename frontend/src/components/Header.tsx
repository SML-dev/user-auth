import React, { useState } from 'react'
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  const logoutReq = async () => {
    const res = await fetch('localhost:5000/api/logout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      return res
    }
    return new Error('Please try again')
  }

  return (
    <div>
      <AppBar style={{ backgroundColor: '#0288d1' }}>
        <Toolbar>
          <Typography variant='h4'>MegaK Project</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs
              indicatorColor='secondary'
              value={window.location.pathname === '/register' ? 1 : 0}
              textColor='inherit'>
              <Tab component='a' href='/login' label='LOGIN' />
              <Tab component='a' href='/register' label='REGISTER' />
              <Tab component='a' href='/logout' label='LOGOUT' />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}
