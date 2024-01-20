import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'

function Carousel({ title, items }) {
  const [translateX, setTranslateX] = useState(0)

  console.log(translateX)

  const handleBefore = function () {
    if (translateX === -200) setTranslateX(0)
    else setTranslateX(translateX => translateX + 600)
  }

  const handleAfter = function () {
    if (translateX === -1200) setTranslateX(-1400)
    else setTranslateX(translateX => translateX - 600)
  }

  const displayedItems = items.slice(0, 20)

  console.log(items)
  console.log(displayedItems)

  return (
    <Box
      sx={{
        padding: '0 100px 50px',
      }}
    >
      <Typography variant='h5'>{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '2rem',
          width: '100%',
          height: '240px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translate(0, -50%)',
            zIndex: '1',
            backdropFilter: 'brightness(0.2)',
            display: translateX === 0 ? 'none' : 'flex',
          }}
          onClick={handleBefore}
        >
          <NavigateBefore />
        </IconButton>
        {displayedItems.map(card => (
          <Box
            key={card._id}
            component={'img'}
            src={card.thumbnail}
            alt='banner'
            sx={{
              height: '80%',
              borderRadius: '1rem',
              transform: `translate(${translateX}%, 0)`,
              transition: 'transform 0.3s linear',
              // transition: index !== -16 && 'transform 0.3s linear',
            }}
          />
        ))}
        <IconButton
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translate(0, -50%)',
            zIndex: '1',
            backdropFilter: 'brightness(0.2)',
            display: translateX === -1400 ? 'none' : 'flex',
          }}
          onClick={handleAfter}
        >
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Carousel
