import { Box, TextField, Typography, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import UpiImage from '../../assets/img/upi.png'
import { lightTheme } from '../routes/Payment'
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function PaymentComponent2() {
  const [displayUpiForm, setDisplayUpiForm] = useState(true)
  const [upi, setUpi] = useState('')
  const [displayError, setDisplayError] = useState(false)

  const navigate = useNavigate()

  const plusHandler = function () {
    setDisplayUpiForm(displayUpiForm => !displayUpiForm)
  }

  const expandHandler = function () {
    setDisplayUpiForm(displayUpiForm => !displayUpiForm)
  }

  const handleSubmitPay = function () {
    if (!upi) return
    if (
      !upi.includes('@') ||
      upi.startsWith('@') ||
      upi.endsWith('@') ||
      upi.length < 8
    ) {
      setDisplayError(true)
      return
    }

    navigate('/pay')
    setDisplayError(false)
  }

  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={'70%'}
      height={displayUpiForm ? '17.5em' : '10em'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      borderRadius={'0.5em'}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={'1em'}
      >
        <Typography
          textTransform={'uppercase'}
          color={lightTheme.palette.text.secondary}
        >
          Pay With
        </Typography>
        <Box component={'img'} src={UpiImage} alt='UPI logo' width={'2.5em'} />
      </Box>
      <Box
        display={'flex'}
        gap={'1em'}
        alignItems={'flex-start'}
        width={'100%'}
      >
        <IconButton onClick={plusHandler}>
          <Add sx={{ fontSize: '2em' }} />
        </IconButton>
        <Box width={'100%'} overflow={'hidden'}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography marginBottom={'1em'}>Add a new UPI</Typography>
            <IconButton onClick={expandHandler}>
              {displayUpiForm ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          {displayUpiForm && (
            <Box display={'flex'} flexDirection={'column'}>
              <Box marginBottom={'1em'}>
                <TextField
                  type='text'
                  placeholder='Enter UPI ID. Eg: 9876543210@upi'
                  size='small'
                  fullWidth
                  sx={{ width: '100%', flexShrink: '1' }}
                  value={upi}
                  onChange={event => setUpi(event.target.value)}
                />
                {displayError && (
                  <Typography variant='subtitle2' color={'rgb(235, 29, 34)'}>
                    Please enter a valid UPI
                  </Typography>
                )}
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-around'}
                marginBottom={'1em'}
              >
                <Typography fontSize={'0.75em'}>@okhdfcbank</Typography>
                <Typography fontSize={'0.75em'}>@okicici</Typography>
                <Typography fontSize={'0.75em'}>@okaxis</Typography>
                <Typography fontSize={'0.75em'}>@oksbi</Typography>
                <Typography fontSize={'0.75em'}>@ybl</Typography>
                <Typography fontSize={'0.75em'}>@ibl</Typography>
              </Box>
              <Button
                variant='contained'
                sx={{ backgroundColor: '#111', flexShrink: '1' }}
                fullWidth
                onClick={handleSubmitPay}
              >
                Continue
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PaymentComponent2
