/* this is the component file to display each song image as a box which can be clicked and has hover styling */

import { PlayCircle } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'

function ImagePlayBox({ src, alt, width, borderRadius, isLoadingData }) {
  const [display, setDisplay] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  const mouseEnterhandler = function () {
    setDisplay(true)
  }

  const mouseLeaveHandler = function () {
    setDisplay(false)
  }

  const loadHandler = function () {
    setIsLoadingImage(false)
  }

  // console.log(0.15 * width)

  return (
    <Box
      position={'relative'}
      onMouseEnter={mouseEnterhandler}
      onMouseLeave={mouseLeaveHandler}
      display={'flex'}
      alignItems={'center'}
      overflow={'hidden'}
      flexShrink={'0'}
      sx={{ cursor: 'pointer' }}
    >
      <Box
        component={'img'}
        src={src}
        alt={alt}
        width={width}
        borderRadius={borderRadius}
        onLoad={loadHandler}
      />
      {display && (
        <Box
          width={width}
          height={'100%'}
          position={'absolute'}
          borderRadius={borderRadius}
          sx={{
            background:
              'linear-gradient(to bottom, rgb(0, 0, 0, 0.35), rgb(0, 0, 0, 0.35))',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
            }}
          >
            <PlayCircle sx={{ fontSize: '2em' }} />
          </IconButton>
        </Box>
      )}
      {(isLoadingImage || isLoadingData) && (
        <Box
          width={width}
          height={'100%'}
          position={'absolute'}
          borderRadius={borderRadius}
          overflow={'hidden'}
        >
          <span className='loader' style={{ position: 'absolute' }}></span>
        </Box>
      )}
    </Box>
  )
}

export default ImagePlayBox
