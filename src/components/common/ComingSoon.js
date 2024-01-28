import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'
import ComingSoonImage from '../../assets/img/coming-soon.jpg'
import { useNavigate } from 'react-router-dom'

function ComingSoon() {
  const navigate = useNavigate()

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'1em'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          component={'img'}
          alt='coming soon text'
          src={ComingSoonImage}
          width={'41.67%'}
          borderRadius='1em'
        />

        <Typography fontSize={{ xs: '1em', md: '1.5em', xl: '2em' }}>
          This feature is currently available.
        </Typography>

        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Box>
    </>
  )
}

export default ComingSoon
