import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ImagePlayBox from './ImagePlayBox'

function ArtistsPage({ title, artistItems, isLoading }) {
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
        {artistItems.map(artist => (
          <Box
            key={artist._id}
            width={{
              xs: 'calc((100% - 0em) / 1)',
              sm: 'calc((100% - 1em) / 2)',
              md: 'calc((100% - 3em) / 4)',
              lg: 'calc((100% - 4em) / 5)',
              xl: 'calc((100% - 5em) / 6)',
            }}
            sx={{ cursor: 'pointer' }}
            onClick={() => clickHandler(artist._id)}
          >
            {/* <Box
              component={'img'}
              src={artist.image}
              alt={artist.name}
              maxWidth='12.875em'
              borderRadius='1em'
            /> */}
            <ImagePlayBox
              src={artist.image}
              alt={artist.name}
              width={'100%'}
              borderRadius={'1em'}
              isLoadingData={isLoading}
            />
            <Typography variant='h6'>{artist.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ArtistsPage
