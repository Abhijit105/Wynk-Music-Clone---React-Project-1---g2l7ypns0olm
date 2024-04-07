import React from 'react'
import { Box, Typography } from '@mui/material'
import ErrorImage from '../../assets/img/error-image.png'

function PageNotFound() {
  return (
    <Box
      height={'100vh'}
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      gap={'1em'}
      justifyContent={'center'}
      alignItems={'center'}
      margin={'4em auto'}
    >
      <Box
        component={'img'}
        src={ErrorImage}
        alt='error'
        display={'flex'}
        width={'41.67%'}
      />
      <Typography variant='h5' textAlign={'center'}>
        Bad link, page not found!
      </Typography>
    </Box>
  )
}

export default PageNotFound
