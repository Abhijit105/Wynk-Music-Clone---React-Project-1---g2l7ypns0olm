import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ArtistsPage({ title, artistItems }) {
  const navigate = useNavigate()

  const clickHandler = function (artistId) {
    navigate(`/artists/${artistId}`)
  }

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
        {artistItems.map((artist, i) => (
          <Box
            key={i}
            maxWidth='12.875em'
            sx={{ cursor: 'pointer' }}
            onClick={() => clickHandler(artist._id)}
          >
            <Box
              component={'img'}
              src={artist.image}
              alt={artist.name}
              maxWidth='12.875em'
              borderRadius='1em'
            />
            <Typography variant='h6'>{artist.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ArtistsPage
