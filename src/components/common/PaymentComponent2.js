import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import UpiImage from '../../assets/img/upi.png'
import { lightTheme } from '../routes/Payment'
import { Add } from '@mui/icons-material'

function PaymentComponent2() {
  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={'70%'}
      height={'50%'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      borderRadius={'0.5em'}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box>
          <Typography
            textTransform={'uppercase'}
            color={lightTheme.palette.text.secondary}
          >
            Pay With
          </Typography>
          <Box component={'img'} src={UpiImage} alt='UPI logo' />
        </Box>
        <Link href='#'>See all</Link>
      </Box>
      <Box display={'flex'} gap={'1em'}>
        <Add />
        <Box>
          <Typography>Add a new UPI</Typography>
          
        </Box>
      </Box>
    </Box>
  )
}

export default PaymentComponent2
