import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ReactComponent as Tag } from '../../assets/img/Tag.svg'
import { lightTheme } from '../routes/Payment'
import ComingSoonModal from '../ComingSoonModal'

function PaymentComponent5() {
  const [openComingSoonModal, setOpenComingSoonModal] = React.useState(false)
  const [displayForm, setDisplayForm] = useState(true)

  const handleOpenComingSoonModal = event => {
    event.preventDefault()
    setOpenComingSoonModal(true)
  }

  const handleCloseComingSoonModal = () => {
    setOpenComingSoonModal(false)
  }

  return (
    <Box
      border={`1px solid ${lightTheme.palette.divider}`}
      width={{ xs: '90%', md: '75%', lg: '50%' }}
      minHeight={'10%'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={'0.5em'}
    >
      <Tag />
      <Typography>Have a promo code?</Typography>
      <Button onClick={event => handleOpenComingSoonModal(event)}>Apply</Button>
      <ComingSoonModal
        open={openComingSoonModal}
        handleClose={handleCloseComingSoonModal}
      />
    </Box>
  )
}

export default PaymentComponent5
