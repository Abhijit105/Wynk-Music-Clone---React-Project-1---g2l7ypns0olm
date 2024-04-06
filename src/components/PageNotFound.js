import React from 'react'
import { Box, Typography } from '@mui/material'
import ErrorImage from '../assets/img/error-image.png'

function PageNotFound() {
  return (
    <Box
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      gap={'1em'}
      justifyContent={'center'}
      alignItems={'center'}
      margin={'4em auto'}
    >
      <Box component={'img'} src={ErrorImage} alt='error' display={'flex'} />
      <Typography variant='h5'>Bad link, page not found!</Typography>
    </Box>
  )
}

export default PageNotFound
