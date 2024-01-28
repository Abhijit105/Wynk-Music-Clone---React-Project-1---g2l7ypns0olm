import { Box, Typography } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Album from '../routes/Album'
import ImagePlayBox from './ImagePlayBox'

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
            width={{
              xs: 'calc((100% - 0em) / 1)',
              sm: 'calc((100% - 1em) / 2)',
              md: 'calc((100% - 3em) / 4)',
              lg: 'calc((100% - 4em) / 5)',
              xl: 'calc((100% - 5em) / 6)',
            }}
            sx={{ cursor: 'pointer' }}
            onClick={() => clickHandler(album)}
          >
            {/* <Box
              component={'img'}
              src={album.image}
              alt={album.title}
              maxWidth='12.875em'
              borderRadius='1em'
            /> */}
            <ImagePlayBox
              src={album.image}
              alt={album.title}
              width={'100%'}
              borderRadius={'1em'}
            />
            <Typography variant='h6'>{album.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AlbumsPage
