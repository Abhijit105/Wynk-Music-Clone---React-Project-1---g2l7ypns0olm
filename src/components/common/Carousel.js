import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import LoginModal from '../../components/LoginModal'
import ImagePlayBox from './ImagePlayBox'

function Carousel({ title, items, onPlaylistUpdate, onTrackUpdate }) {
  const [translateX, setTranslateX] = useState(0)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)

  const { webToken } = useContext(AuthContext)

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesSmallScreen = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))
  const matchesLargeScreen = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const matchesExtraLargeScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xl')
  )

  // console.log(translateX)

  const handleBefore = function () {
    if (matchesExtraLargeScreen) {
      if (translateX > -600) setTranslateX(0)
      else setTranslateX(translateX => translateX + 600)
    } else if (matchesLargeScreen) {
      if (translateX > -500) setTranslateX(0)
      else setTranslateX(translateX => translateX + 500)
    } else if (matchesMediumScreen) {
      if (translateX > -400) setTranslateX(0)
      else setTranslateX(translateX => translateX + 400)
    } else if (matchesSmallScreen) {
      if (translateX > -200) setTranslateX(0)
      else setTranslateX(translateX => translateX + 200)
    } else if (matchesExtraSmallScreen) {
      if (translateX > -100) setTranslateX(0)
      else setTranslateX(translateX => translateX + 100)
    }
  }

  const handleAfter = function () {
    if (matchesExtraLargeScreen) {
      if (translateX < -800) setTranslateX(-1400)
      else setTranslateX(translateX => translateX - 600)
    } else if (matchesLargeScreen) {
      if (translateX < -1000) setTranslateX(-1500)
      else setTranslateX(translateX => translateX - 500)
    } else if (matchesMediumScreen) {
      if (translateX < -1200) setTranslateX(-1600)
      else setTranslateX(translateX => translateX - 400)
    } else if (matchesSmallScreen) {
      if (translateX < -1600) setTranslateX(-1800)
      else setTranslateX(translateX => translateX - 200)
    } else if (matchesExtraSmallScreen) {
      if (translateX < -1800) setTranslateX(-1900)
      else setTranslateX(translateX => translateX - 100)
    }
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

  // console.log(items)
  // console.log(displayedItems)
  // console.log(window.innerWidth - 16.8)
  // console.log(window.innerWidth - 16.8 - 2 * 6 * 16)
  // console.log((window.innerWidth - 16.8 - (2 * 6 + 4 * 2) * 16) / 5)

  return (
    <Box marginBottom='4em'>
      <Typography variant='h5' marginBottom={'1em'}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
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
            key={i}
            display='flex'
            flexDirection='column'
            flexShrink={'0'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            width={{
              xs: `${
                (((window.innerWidth - 16.8) / 16 - 2 * 6) /
                  (1 * ((window.innerWidth - 16.8) / 16 - 2 * 6))) *
                100
              }%`,
              sm: `${
                (((window.innerWidth - 16.8) / 16 - 2 * 6) /
                  (2 * ((window.innerWidth - 16.8) / 16 - 2 * 6))) *
                100
              }%`,
              md: `${
                (((window.innerWidth - 16.8) / 16 - 2 * 6) /
                  (4 * ((window.innerWidth - 16.8) / 16 - 2 * 6))) *
                100
              }%`,
              lg: `${
                (((window.innerWidth - 16.8) / 16 - 2 * 6) /
                  (5 * ((window.innerWidth - 16.8) / 16 - 2 * 6))) *
                100
              }%`,
              xl: `${
                (((window.innerWidth - 16.8) / 16 - 2 * 6) /
                  (6 * ((window.innerWidth - 16.8) / 16 - 2 * 6))) *
                100
              }%`,
            }}
            // width = (((window.innerWidth - widthOfScrollBar) / 16)em - ((2 * paddingX)em) - (((n - 1) * gap)em)) / (n * ((window.innerWidth - 16) / 16)em - ((2 * paddingX)em))
            borderRadius={'1em'}
            sx={{
              cursor: 'pointer',
              transform: `translate(${translateX}%, 0)`,
              transition: 'transform 0.3s linear',
            }}
            onClick={e =>
              webToken ? songClickHandler(i) : handleOpenLoginModal(e)
            }
          >
            {/* <Box
              component={'img'}
              src={song.thumbnail}
              alt='Song image'
              width={'90%'}
              borderRadius={'1em'}
            /> */}
            <ImagePlayBox
              src={song.thumbnail}
              alt={'Song image'}
              width={'90%'}
              borderRadius={'1em'}
            />
            <Typography color='white'>{song.title}</Typography>
          </Box>
        ))}
        <IconButton
          sx={{
            position: 'absolute',
            right: '2.5rem',
            top: '50%',
            transform: 'translate(0, -50%)',
            zIndex: '1',
            backdropFilter: 'brightness(0.2)',
            display: {
              xs: `${translateX === -1900 ? 'none' : 'flex'}`,
              sm: `${translateX === -1800 ? 'none' : 'flex'}`,
              md: `${translateX === -1600 ? 'none' : 'flex'}`,
              lg: `${translateX === -1500 ? 'none' : 'flex'}`,
              xl: `${translateX === -1400 ? 'none' : 'flex'}`,
            },
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
