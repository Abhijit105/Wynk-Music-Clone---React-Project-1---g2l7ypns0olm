import { Box, Typography } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Album from '../routes/Album'

function AlbumsPage({ title, albumItems }) {
  const navigate = useNavigate()

  const clickHandler = function (selectedAlbum) {
    navigate(`/albums/${selectedAlbum._id}`)
  }
  // console.log(albumItems)

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
          <Box
            key={i}
            maxWidth='12.875em'
            sx={{ cursor: 'pointer' }}
            onClick={() => clickHandler(album)}
          >
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
