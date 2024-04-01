import {
  Modal,
  Typography,
  Box,
  Card,
  CardContent,
  useMediaQuery,
} from '@mui/material'
import React, {  useState } from 'react'
import DownloadAppModalImage from '../assets/img/downloadappmodalimage.png'
import GooglePlay from '../assets/img/googleplay.png'
import AppStore from '../assets/img/appstore.png'
import { darkTheme } from './App'
import ComingSoonImage from '../assets/img/coming-soon.jpg'

function ComingSoonModal({ open, handleClose }) {
  // console.log(window.innerWidth)
  // console.log(window.innerHeight)

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '58.33%', md: '41.67%' },
          height: '68.18%',
          backgroundColor: darkTheme.palette.background.default,
          color: '#272727',
          boxShadow: '0 0 0 500px #17191d',
          display: 'grid',
          gridTemplateColumns: { xs: '1', sm: '42.1875% 57.8125%' },
          gridTemplateRows: '100%',
          borderRadius: '1em',
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'img'}
          src={DownloadAppModalImage}
          alt='Wynk promotion'
          width={'100%'}
          height={'100%'}
          display={{ xs: 'none', sm: 'flex' }}
        ></Box>
        <Box
          sx={{
            gridColumn: '2',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: darkTheme.palette.text.primary,
            width: '100%',
            justifyContent: 'space-between',
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
              <Typography
                fontSize={{ xs: '0.75em', md: '1em', xl: '1.25em' }}
                color={darkTheme.palette.text.primary}
              >
                Coming Soon
              </Typography>
            </CardContent>
          </Card>
          <Box
            sx={{
              marginTop: 'auto',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: { xs: 'column', lg: 'row' },
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
