import { Box, Typography } from '@mui/material'
import React from 'react'
import { lightTheme } from '../routes/Payment'

function PaymentComponent4() {
  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={{ xs: '90%', md: '75%', lg: '50%' }}
      minHeight={'8%'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      borderRadius={'0.5em'}
    >
      <Typography fontSize={'2em'}>Pay ₹amount</Typography>
      <Typography color={lightTheme.palette.text.secondary}>
        WYNK MUSIC &bull; Auto-renew
      </Typography>
    </Box>
  )
}

export default PaymentComponent4
