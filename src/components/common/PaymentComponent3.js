import { CreditCard, ExpandMore } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { lightTheme } from '../routes/Payment'
import ComingSoonModal from '../ComingSoonModal'

function PaymentComponent3() {
  const [openComingSoonModal, setOpenComingSoonModal] = React.useState(false)

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
      width={'70%'}
      height={'8.5em'}
      padding={'1em'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      borderRadius={'0.5em'}
    >
      <Typography textTransform={'uppercase'}>Other Options</Typography>
      <Box display={'flex'} alignItems={'center'} gap={'1.5em'}>
        <CreditCard />
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Typography>Credit & Debit Cards</Typography>
          <IconButton onClick={event => handleOpenComingSoonModal(event)}>
            <ExpandMore />
          </IconButton>
        </Box>
      </Box>
      <ComingSoonModal
        open={openComingSoonModal}
        handleClose={handleCloseComingSoonModal}
      />
    </Box>
  )
}

export default PaymentComponent3
