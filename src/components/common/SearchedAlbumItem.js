import { Box, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '../App'

function SearchedAlbumItem({ item }) {
  return (
    <Box display='flex' alignItems='center' gap='1em' marginBottom='2.5em'>
      <Box
        component={'img'}
        src={item.image}
        alt={item.title}
        maxWidth='4em'
        borderRadius='0.5em'
      />
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Typography variant='subtitle1'>{item.title}</Typography>
        <Typography variant='subtitle2'>
          <Box
            display='flex'
            gap='1em'
            color={darkTheme.palette.text.secondary}
          >
            <span>Album</span>
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}

export default SearchedAlbumItem
