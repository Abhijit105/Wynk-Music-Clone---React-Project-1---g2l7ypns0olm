import {
  Modal,
  TextField,
  Typography,
  Box,
  OutlinedInput,
  Button,
} from '@mui/material'
import React, { useState } from 'react'
import ModalBackground from '../../assets/img/modalbackground.png'
import GooglePlay from '../../assets/img/googleplay.png'
import AppStore from '../../assets/img/appstore.png'

function SubscriptionModal({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '640px',
          height: '450px',
          background: `url(${ModalBackground})`,
          color: '#272727',
          boxShadow: '0 0 0 600px #17191d',
          display: 'grid',
          gridTemplateColumns: '3fr 4fr',
        }}
      >
        <Box
          sx={{
            gridColumn: '2',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' textAlign='center' margin={'1rem 2rem 3rem'}>
            Login/Signup
          </Typography>
          <Typography variant='body1'>
            Get a personalised experience, and access all your music
          </Typography>
          <OutlinedInput
            size='small'
            placeholder='Enter email'
            sx={{
              fontFamily: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              margin: '10px',
              width: '100%',
              borderRadius: '100px',
            }}
          />
          <OutlinedInput
            size='small'
            placeholder='Enter password'
            sx={{
              fontFamily: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              margin: '10px',
              width: '100%',
              borderRadius: '100px',
            }}
          />
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant='contained'>Login</Button>
            <Button variant='contained'>Sign Up</Button>
          </Box>
          <Box
            sx={{
              marginTop: 'auto',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <Typography variant='body2'>Available on</Typography>
            <Box component={'img'} src={GooglePlay} height='1.5rem' />
            <Box component={'img'} src={AppStore} height='1.5rem' />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default SubscriptionModal
