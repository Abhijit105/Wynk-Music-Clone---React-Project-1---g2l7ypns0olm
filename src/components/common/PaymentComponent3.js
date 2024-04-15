import { CreditCard, ExpandMore } from '@mui/icons-material'
import { Box, Button, IconButton, Typography, TextField } from '@mui/material'
import React, { useState } from 'react'
import { lightTheme } from '../routes/Payment'
import { useNavigate } from 'react-router-dom'

function PaymentComponent3() {
  const [displayCardForm, setDisplayCardForm] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [validThrough, setValidThrough] = useState('')
  const [cvv, setCvv] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleOpenCloseCardForm = function () {
    setDisplayCardForm(!displayCardForm)
  }

  const handleSubmitPay = function () {
    if (!cardNumber || !validThrough || !cvv || !nameOnCard) {
      setMessage('Please fill in all the details')
      return
    }
    if (cardNumber.length !== 16) {
      setMessage('Invalid card number')
      return
    }
    if (validThrough.length !== 4) {
      setMessage('Invalid validity date')
      return
    }
    if (cvv.length !== 3) {
      setMessage('Invalid CVV')
      return
    }
    if (nameOnCard.length < 3) {
      setMessage('Invalid card holder name')
      return
    }
    navigate('/pay')
  }

  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={'70%'}
      height={displayCardForm ? '20em' : '8.5em'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      borderRadius={'0.5em'}
    >
      <Typography textTransform={'uppercase'}>Other Options</Typography>
      <Box display={'flex'} alignItems={'center'} gap={'1.5em'}>
        <CreditCard />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={'100%'}
        >
          <Typography>Credit & Debit Cards</Typography>
          <IconButton onClick={handleOpenCloseCardForm}>
            <ExpandMore />
          </IconButton>
        </Box>
      </Box>
      {displayCardForm && (
        <Box>
          <TextField
            type='text'
            placeholder='Card Number'
            size='small'
            fullWidth
            sx={{ marginBottom: '1em', width: '100%', flexShrink: '1' }}
            value={cardNumber}
            onChange={event => setCardNumber(event.target.value.slice(0, 16))}
          />
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '0', sm: '1em' }}
          >
            <TextField
              type='text'
              placeholder='Valid through MMYY'
              size='small'
              sx={{ marginBottom: '1em', width: '100%', flexShrink: '1' }}
              value={validThrough}
              onChange={event =>
                setValidThrough(event.target.value.slice(0, 4))
              }
            />
            <TextField
              type='text'
              placeholder='CVV'
              size='small'
              sx={{ marginBottom: '1em', width: '100%', flexShrink: '2' }}
              value={cvv}
              onChange={event => setCvv(event.target.value.slice(0, 3))}
            />
          </Box>
          <TextField
            type='text'
            placeholder='Name on card'
            size='small'
            fullWidth
            sx={{ marginBottom: '1em', width: '100%', flexShrink: '1' }}
            value={nameOnCard}
            onChange={event => setNameOnCard(event.target.value)}
          />
          <Button
            variant='contained'
            fullWidth
            sx={{ backgroundColor: '#111', flexShrink: '1' }}
            onClick={handleSubmitPay}
          >
            Continue
          </Button>
          <Typography variant='subtitle2' color={'rgb(235, 29, 34)'}>
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default PaymentComponent3
