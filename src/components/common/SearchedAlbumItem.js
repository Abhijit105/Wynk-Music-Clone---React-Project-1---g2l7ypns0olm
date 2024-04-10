import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { darkTheme } from '../App'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../contexts/AllProvider'

function SearchedAlbumItem({ item, isLoadingData }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  const navigate = useNavigate()

  const { searchTermUpdate } = useContext(AllContext)

  const loadHandler = function () {
    setIsLoadingImage(false)
  }

  const clickHandler = function (albumId) {
    navigate(`/albums/${albumId}`)
    searchTermUpdate('')
  }

  // console.log(item)

  return (item &&
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
      <Box position={'relative'} width={'4em'} height={'4em'}>
        <Box
          component={'img'}
          src={item.image}
          alt={item.title}
          maxWidth='4em'
          borderRadius='0.5em'
          onLoad={loadHandler}
        />
        {(isLoadingData || isLoadingImage) && (
          <Box
            width={'4em'}
            height={'4em'}
            position={'absolute'}
            bottom={'0'}
            borderRadius={'0.5em'}
            overflow={'hidden'}
          >
            <span className='loader' style={{ position: 'absolute' }}></span>
          </Box>
        )}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems={{ xs: 'center', sm: 'start' }}
      >
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
