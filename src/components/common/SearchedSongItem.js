import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { darkTheme } from '../App'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../contexts/AllProvider'

function SearchedSongItem({ item, isLoadingData }) {
  const [isLoadingImage, setIsLoadignImage] = useState(true)

  const navigate = useNavigate()

  const { searchTermUpdate } = useContext(AllContext)

  const loadHandler = function () {
    setIsLoadignImage(false)
  }

  const clickHandler = function (albumId) {
    navigate(`/albums/${albumId}`)
    searchTermUpdate('')
  }
  return (
    <Box
      display='flex'
      alignItems='center'
      gap='1em'
      marginBottom='2.5em'
      sx={{ cursor: 'pointer' }}
      onClick={() => clickHandler(item.album)}
    >
      <Box position={'relative'} width={'4em'} height={'4em'}>
        <Box
          component={'img'}
          src={item.thumbnail}
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
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Typography variant='subtitle1'>{item.title}</Typography>
        <Typography variant='subtitle2'>
          <Box
            display='flex'
            gap='1em'
            color={darkTheme.palette.text.secondary}
          >
            <span>Song</span>
            <li>
              {item.artist
                .slice(0, 4)
                .map(a => a.name)
                .join(', ')}
              {item.artist.length > 4 ? '...' : ''}
            </li>
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}

export default SearchedSongItem
