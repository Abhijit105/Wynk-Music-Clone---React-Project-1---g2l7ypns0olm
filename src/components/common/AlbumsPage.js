import { Box, Typography } from '@mui/material'
import React from 'react'

function AlbumsPage({ title, albumItems }) {
  return (
    <Box marginBottom='4em'>
      <Typography variant='h4' marginBottom='1em'>
        {title}
      </Typography>
      <Box
        display='flex'
        alignItems='flex-start'
        flexWrap='wrap'
        gap='1em'
        justifyContent='flex-start'
      >
        {albumItems.map((album, i) => (
          <Box key={i} maxWidth='12.875em'>
            <Box
              component={'img'}
              src={album.image}
              alt={album.title}
              maxWidth='12.875em'
              borderRadius='1em'
            />
            <Typography variant='h6'>{album.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AlbumsPage
