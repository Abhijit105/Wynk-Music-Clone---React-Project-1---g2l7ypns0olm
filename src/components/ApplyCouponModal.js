import { Box, Modal, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { ReactComponent as Tag } from '../assets/img/Tag.svg'
import { lightTheme } from './routes/Payment'

function ApplyCouponModal({ open, handleClose, couponCode, onCouponCode }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '25%',
          backgroundColor: lightTheme.palette.background.default,
          padding: '2em',
          borderRadius: '1em',
        }}
      >
        <Typography
          display={'flex'}
          alignItems={'center'}
          gap={'1em'}
          variant='h5'
          fontWeight={'bold'}
          marginBottom={'2em'}
        >
          <Tag /> Apply Promocode
        </Typography>
        <TextField
          fullWidth
          size='small'
          sx={{ marginBottom: '1em' }}
          placeholder='Enter promo code here'
          value={couponCode}
          onChange={event => onCouponCode(event.target.value)}
        />
        <Button
          variant='contained'
          fullWidth
          sx={{ backgroundColor: lightTheme.palette.background.paper }}
          onClick={handleClose}
        >
          Apply
        </Button>
      </Box>
    </Modal>
  )
}

export default ApplyCouponModal
