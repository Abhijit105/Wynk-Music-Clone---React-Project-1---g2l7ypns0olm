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
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'img'}
          alt='coming soon text'
          src={ComingSoonImage}
          maxWidth='40em'
          borderRadius='1em'
        />
        <CardContent>
          <Typography variant='h4'>
            This feature is currently available.
          </Typography>
        </CardContent>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Card>
    </>
  )
}

export default ComingSoon
