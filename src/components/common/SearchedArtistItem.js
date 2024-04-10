import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { darkTheme } from '../App'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../contexts/AllProvider'

function SearchedArtistItem({ item, isLoadingData }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  const navigate = useNavigate()

  const { searchTermUpdate } = useContext(AllContext)

  const loadHandler = function () {
    setIsLoadingImage(false)
  }

  const clickHandler = function (albumId) {
    navigate(`/artists/${albumId}`)
    searchTermUpdate('')
  }

  // console.log(item)

  return (
    item && (
      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={'start'}
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
          maxWidth='5em'
          borderRadius='50%'
          onLoad={loadHandler}
        />
        {(isLoadingData || isLoadingImage) && (
          <span
            className='loader-artist'
            style={{ position: 'absolute' }}
          ></span>
        )}
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems={{ xs: 'center', sm: 'start' }}
        >
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
  )
}

export default SearchedArtistItem
