import { Box, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '../App'
import { useNavigate } from 'react-router-dom'

function SearchedArtistItem({ item }) {
  const navigate = useNavigate()

  const clickHandler = function (albumId) {
    navigate(`/artists/${albumId}`)
  }

  console.log(item)

  return (
    <Box
      display='flex'
      alignItems='center'
      gap='1em'
      marginBottom='2.5em'
      onClick={() => clickHandler(item._id)}
      sx={{ cursor: 'pointer' }}
    >
      <Box
        component={'img'}
        src={item.image}
        alt={item.name}
        maxWidth='4em'
        borderRadius='50%'
      />
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Typography variant='subtitle1'>{item.name}</Typography>
        <Typography variant='subtitle2'>
          <Box
            display='flex'
            gap='1em'
            color={darkTheme.palette.text.secondary}
          >
            <span>Artist</span>
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}

export default SearchedArtistItem
