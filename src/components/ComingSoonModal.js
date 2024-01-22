import {
  Modal,
  TextField,
  Typography,
  Box,
  OutlinedInput,
  Button,
  Card,
  CardContent,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DownloadAppModalImage from '../assets/img/downloadappmodalimage.png'
import GooglePlay from '../assets/img/googleplay.png'
import AppStore from '../assets/img/appstore.png'
import { darkTheme } from './App'
import ComingSoonImage from '../assets/img/coming-soon.jpg'

function ComingSoonModal({ open, handleClose }) {
  const [displaySignUp, setDisplaySignUp] = useState(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '40em',
          maxHeight: '30em',
          backgroundColor: darkTheme.palette.background.default,
          color: '#272727',
          boxShadow: '0 0 0 500px #17191d',
          display: 'grid',
          gridTemplateColumns: '3fr 4fr',
          gridTemplateRows: '1fr',
          borderRadius: '1em',
          overflow: 'hidden',
        }}
      >
        <Box
          component={'img'}
          src={DownloadAppModalImage}
          alt='Wynk promotion'
          maxHeight='480px'
        ></Box>
        <Box
          sx={{
            gridColumn: '2',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: darkTheme.palette.text.primary,
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '1em',
            }}
          >
            <CardContent>
              <Typography variant='h4'>
                This feature is currently available.
              </Typography>
            </CardContent>
          </Card>
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

export default ComingSoonModal
