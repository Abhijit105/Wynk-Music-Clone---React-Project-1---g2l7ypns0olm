import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import Crown from '../assets/img/crown.png'

function Subscription() {
  return (
    <Paper>
      <Typography variant='h6'>
        Go Premium
        <Box component={'img'} src={Crown} alt='crown' />
      </Typography>
      <Typography variant='caption'>
        Get the best of music and podcasts
      </Typography>
    </Paper>
  )
}

export default Subscription
