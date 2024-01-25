import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import LoginModal from '../../components/LoginModal'

function Carousel({ title, items, onPlaylistUpdate, onTrackUpdate }) {
  const [translateX, setTranslateX] = useState(0)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)

  const { webToken } = useContext(AuthContext)

  console.log(translateX)

  const handleBefore = function () {
    if (translateX === -200) setTranslateX(0)
    else setTranslateX(translateX => translateX + 600)
  }

  const handleAfter = function () {
    if (translateX === -1200) setTranslateX(-1400)
    else setTranslateX(translateX => translateX - 600)
  }

  const songClickHandler = function (i) {
    onPlaylistUpdate(displayedItems)
    onTrackUpdate(i)
  }

  const handleOpenLoginModal = e => {
    e.preventDefault()
    setOpenLoginModal(true)
  }

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
  }

  const displayedItems = items.slice(0, 20)

  console.log(items)
  console.log(displayedItems)

  return (
    <Box marginBottom='60px'>
      <Typography variant='h5'>{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '2rem',
          width: '100%',
          height: '256px',
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
        {displayedItems.map((song, i) => (
          <Box
            display='flex'
            flexDirection='column'
            gap='0.5em'
            height='100%'
            sx={{ cursor: 'pointer' }}
            onClick={e =>
              webToken ? songClickHandler(i) : handleOpenLoginModal(e)
            }
          >
            <Box
              key={i}
              component={'img'}
              src={song.thumbnail}
              alt='banner'
              sx={{
                height: '75%',
                borderRadius: '1rem',
                transform: `translate(${translateX}%, 0)`,
                transition: 'transform 0.3s linear',
              }}
            />
            <Typography color='white'>{song.title}</Typography>
          </Box>
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
      <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal} />
    </Box>
  )
}

export default Carousel
