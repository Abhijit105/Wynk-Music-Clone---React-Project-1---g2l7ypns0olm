import { PlayCircle } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'

function ImagePlayBox({ src, alt, width, borderRadius }) {
  const [display, setDisplay] = useState(false)

  const mouseEnterhandler = function () {
    setDisplay(true)
  }

  const mouseLeaveHandler = function () {
    setDisplay(false)
  }

  // console.log(0.15 * width)

  return (
    <Box
      position={'relative'}
      onMouseEnter={mouseEnterhandler}
      onMouseLeave={mouseLeaveHandler}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      overflow={'hidden'}
    >
      <Box
        component={'img'}
        src={src}
        alt={alt}
        width={width}
        borderRadius={borderRadius}
      />
      {display && (
        <Box
          width={width}
          height={'100%'}
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          borderRadius={`${0.15 * width}`}
          sx={{
            background:
              'linear-gradient(to bottom, rgb(0, 0, 0, 0.35), rgb(0, 0, 0, 0.35))',
            transform: 'translate(-50%, -50%)',
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
    </Box>
  )
}

export default ImagePlayBox
