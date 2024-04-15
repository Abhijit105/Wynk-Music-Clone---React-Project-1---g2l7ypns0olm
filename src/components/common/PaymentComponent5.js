import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ReactComponent as Tag } from '../../assets/img/Tag.svg'
import { lightTheme } from '../routes/Payment'
import ComingSoonModal from '../ComingSoonModal'
import ApplyCouponModal from '../ApplyCouponModal'

function PaymentComponent5() {
  const [openApplyCouponModal, setOpenApplyCouponModal] = useState(false)
  const [couponCode, setCouponCode] = useState('')

  const handleOpenApplyCouponModal = function (event) {
    event.preventDefault()
    setOpenApplyCouponModal(true)
  }

  const handleCloseApplyCouponModal = function () {
    setOpenApplyCouponModal(false)
  }

  return (
    <>
      <Box
        // border={`1px solid ${lightTheme.palette.divider}`}
        border={`1px solid black`}
        width={{ xs: '90%', md: '75%', lg: '50%' }}
        height={'4.5em'}
        padding={'1em'}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderRadius={'0.5em'}
      >
        <Tag />
        <Typography lineHeight={'1'}>Have a promo code?</Typography>
        <Button onClick={event => handleOpenApplyCouponModal(event)}>
          Apply
        </Button>
      </Box>
      {couponCode === 'OFFER10' && (
        <Typography variant='h5' fontWeight={'semibold'}>
          OFFER10 applied
        </Typography>
      )}
      <ApplyCouponModal
        open={openApplyCouponModal}
        handleClose={handleCloseApplyCouponModal}
        couponCode={couponCode}
        onCouponCode={setCouponCode}
      />
    </>
  )
}

export default PaymentComponent5
