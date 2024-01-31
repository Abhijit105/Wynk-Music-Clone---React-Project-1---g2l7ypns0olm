import { Box, TextField, Typography, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import UpiImage from '../../assets/img/upi.png'
import { lightTheme } from '../routes/Payment'
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material'
import ComingSoonModal from '../ComingSoonModal'

function PaymentComponent2() {
  const [openComingSoonModal, setOpenComingSoonModal] = React.useState(false)
  const [displayForm, setDisplayForm] = useState(true)

  const handleOpenComingSoonModal = event => {
    event.preventDefault()
    setOpenComingSoonModal(true)
  }

  const handleCloseComingSoonModal = () => {
    setOpenComingSoonModal(false)
  }

  const plusHandler = function () {
    setDisplayForm(displayForm => !displayForm)
  }

  const expandHandler = function () {
    setDisplayForm(displayForm => !displayForm)
  }

  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={'70%'}
      height={displayForm ? '17.5em' : '10em'}
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
        <Box display={'flex'} alignItems={'center'}>
          <Typography
            textTransform={'uppercase'}
            color={lightTheme.palette.text.secondary}
          >
            Pay With
          </Typography>
          <Box
            component={'img'}
            src={UpiImage}
            alt='UPI logo'
            width={'2.5em'}
          />
        </Box>
        <Button onClick={event => handleOpenComingSoonModal(event)}>
          See all
        </Button>
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
              {displayForm ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          {displayForm && (
            <Box display={'flex'} flexDirection={'column'}>
              <TextField
                type='text'
                placeholder='Enter UPI ID. Eg: 9876543210@upi'
                size='small'
                fullWidth
                sx={{ marginBottom: '1em', width: '100%', flexShrink: '1' }}
              />
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
                onClick={event => handleOpenComingSoonModal(event)}
              >
                Continue
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <ComingSoonModal
        open={openComingSoonModal}
        handleClose={handleCloseComingSoonModal}
      />
    </Box>
  )
}

export default PaymentComponent2
