import React from 'react'
import UpiImage from '../../assets/img/upi.png'
import { ReactComponent as RibbonImage } from '../../assets/img/Ribbon.svg'
import { NavigateNext } from '@mui/icons-material'
import { Box, Typography, IconButton } from '@mui/material'
import { lightTheme } from '../routes/Payment'
import { useNavigate } from 'react-router-dom'

function PaymentComponent1() {
  const navigate = useNavigate()

  const payHandler = function () {
    navigate('/pay')
  }

  const height = window.innerHeight

  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={'70%'}
      height={'10em'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      borderRadius={'0.5em'}
    >
      <Box display={'flex'} alignItems={'flex-end'}>
        <RibbonImage />
        <Typography
          textTransform={'uppercase'}
          color={lightTheme.palette.text.disabled}
        >
          Recommended Options {height}
        </Typography>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'1em'}>
          <Box component={'img'} src={UpiImage} width={'2.5em'} />
          <Box>
            <Typography>VPA</Typography>
            <Typography
              color={lightTheme.palette.text.secondary}
              fontSize={'0.75em'}
            >
              9876543210@airtel
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={payHandler}>
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  )
}

export default PaymentComponent1
