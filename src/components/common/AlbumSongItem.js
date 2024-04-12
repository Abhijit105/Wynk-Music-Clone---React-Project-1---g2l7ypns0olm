import React, { useEffect } from 'react'
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Snackbar,
  useMediaQuery,
  Button,
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useState } from 'react'
import LoginModal from '../../components/LoginModal'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { BASEURL3, PROJECTID } from '../../config/config'
import ImagePlayBox from './ImagePlayBox'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { darkTheme } from '../App'
import ArtistsModal from '../ArtistsModal'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import ErrorImage from '../../assets/img/error-image.png'
import { FavoriteContext } from '../../contexts/FavoriteProvider'

function AlbumSongItem({
  albumName,
  item,
  i,
  songItems,
  allArtists,
  isLoading,
}) {
  const [artists, setArtists] = useState([])
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [openArtistsModal, setOpenArtistsModal] = React.useState(false)

  const navigate = useNavigate()

  const { webToken } = useContext(AuthContext)
  const { likedSongs, setRefetchLikedSongs } = useContext(FavoriteContext)

  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const clickHandler = function (i) {
    setPlaylist(songItems)
    setTrack(i)
  }

  const artistClickHandler = function (event, artistId) {
    event.preventDefault()
    event.stopPropagation()
    navigate(`/artists/${artistId}`)
  }

  const albumClickHandler = function (event, albumId) {
    event.preventDefault()
    event.stopPropagation()
    navigate(`/albums/${albumId}`)
  }

  const handleOpenLoginModal = event => {
    event.preventDefault()
    setOpenLoginModal(true)
  }

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const handleOpenArtistsModal = event => {
    event.preventDefault()
    setOpenArtistsModal(true)
  }

  const handleCloseArtistsModal = () => {
    setOpenArtistsModal(false)
  }

  const showMoreHandler = function (event) {
    event.stopPropagation()
    handleOpenArtistsModal(event)
  }

  const mouseEnterHandler = function () {
    setIsHovered(true)
  }

  const mouseLeaveHandler = function () {
    setIsHovered(false)
  }

  const favoriteHandler = function (event, selectedSongId) {
    event.stopPropagation()
    mutate(selectedSongId)
  }

  const {
    mutate,
    isLoading: isLoadingFavorite,
    isPending: isPendingFavorite,
    isError: isErrorFavorite,
    error: errorFavorite,
    data: dataFavorite,
  } = useMutation({
    mutationFn: async songId => {
      const response = await fetch(`${BASEURL3}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${webToken.token}`,
          projectId: `${PROJECTID}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId: songId }),
      })
      if (!response.ok) {
        throw new Error('Something went wrong during setting up of favorite.')
      }
      const data = await response.json()
      return data
    },
    onSuccess: response => {
      setMessageSnackbar(response.message)
      setOpenSnackbar(true)
      setRefetchLikedSongs(true)
    },
    onError: error => {
      setMessageSnackbar(error.response.message)
      setOpenSnackbar(true)
    },
  })

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  useEffect(() => {
    if (isLoading) return

    for (const artistId of item.artist) {
      const newArtist = allArtists.find(a => a._id === artistId)
      if (newArtist) setArtists(artists => [...artists, newArtist])
    }
  }, [isLoading])

  // console.log(item)
  // console.log(item.artist)
  // console.log(allArtists)
  // console.log(artists)

  if (isErrorFavorite)
    return (
      <Box
        height={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        gap={'1em'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={'4em'}
      >
        <Box
          component={'img'}
          src={ErrorImage}
          alt='error'
          display={'flex'}
          width={'41.67%'}
        />
        <Typography variant='h5' textAlign={'center'}>
          {errorFavorite?.message}
        </Typography>
      </Box>
    )

  return (
    <>
      {matchesMediumScreen && (
        <Grid
          container
          padding={isHovered ? '15px' : '1em'}
          onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
          justifyContent={'end'}
          flexWrap={'nowrap'}
          alignItems={'center'}
          borderRadius={'1em'}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          border={isHovered ? `1px solid ${darkTheme.palette.divider}` : 'none'}
        >
          <Grid item md={'auto'} marginRight='1em' key={1}>
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item md={5} key={2}>
            <Box display='flex' alignItems='center' gap='0.5em'>
              {/* <Box
              component={'img'}
              src={item.thumbnail}
              alt={item.title}
              maxWidth='3em'
              borderRadius='0.375em'
            /> */}
              <ImagePlayBox
                src={item.thumbnail}
                alt={item.title}
                width={'3em'}
                key={i}
                borderRadius={'0.375em'}
                isLoadingData={isLoading}
              />
              <Typography>{item.title}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} key={3}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              {artists.slice(0, 4).map((a, i, arr) => (
                <Box key={a._id} component={'span'}>
                  <Link onClick={event => artistClickHandler(event, a._id)}>
                    {a.name}
                  </Link>
                  <span>{i !== arr.length - 1 ? ', ' : ''}</span>
                </Box>
              ))}
              {artists.length > 4 ? '...' : ''}
              {artists.length > 4 && (
                <Button
                  onClick={event => showMoreHandler(event)}
                  color='inherit'
                  sx={{ textTransform: 'lowercase' }}
                >
                  show more
                </Button>
              )}
            </Typography>
          </Grid>
          <Grid item md={3} key={4}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              <Link onClick={event => albumClickHandler(event, item.album)}>
                {albumName}
              </Link>
            </Typography>
          </Grid>
          <Grid item md={'auto'} key={5}>
            <IconButton
              sx={{
                background: likedSongs?.map(song => song._id).includes(item._id)
                  ? 'linear-gradient(to bottom, #ff8c76, #ff0d55)'
                  : darkTheme.palette.text.primary,
              }}
              onClick={event =>
                webToken
                  ? favoriteHandler(event, item._id)
                  : handleOpenLoginModal(event)
              }
            >
              <Favorite
                fontSize='small'
                sx={{
                  color: likedSongs?.map(song => song._id).includes(item._id)
                    ? darkTheme.palette.text.primary
                    : darkTheme.palette.background.default,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {!matchesMediumScreen && matchesExtraSmallScreen && (
        <Grid
          container
          padding={isHovered ? '15px' : '1em'}
          onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
          justifyContent={'end'}
          flexWrap={'nowrap'}
          alignItems={'center'}
          borderRadius={'1em'}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          border={isHovered ? `1px solid ${darkTheme.palette.divider}` : 'none'}
        >
          <Grid item xs={'auto'} marginRight='1em' key={6}>
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item xs={12} key={7}>
            <Box
              display='flex'
              flexDirection={'column'}
              alignItems='start'
              gap='0.5em'
            >
              {/* <Box
              component={'img'}
              src={item.thumbnail}
              alt={item.title}
              maxWidth='3em'
              borderRadius='0.375em'
            /> */}
              <ImagePlayBox
                src={item.thumbnail}
                alt={item.title}
                width={'3em'}
                key={i}
                borderRadius={'0.375em'}
                isLoadingData={isLoading}
              />
              <Box>
                <Typography>{item.title}</Typography>
                <Typography color='rgba(255, 255, 255, 0.7)'>
                  {artists.slice(0, 4).map((a, i, arr) => (
                    <Box key={a._id} component={'span'}>
                      <Link onClick={event => artistClickHandler(event, a._id)}>
                        {a.name}
                      </Link>
                      <span>{i !== arr.length - 1 ? ', ' : ''}</span>
                    </Box>
                  ))}
                  {artists.length > 4 ? '...' : ''}
                  {artists.length > 4 && (
                    <Button
                      onClick={event => showMoreHandler(event)}
                      color='inherit'
                      sx={{ textTransform: 'lowercase' }}
                    >
                      show more
                    </Button>
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={'auto'} key={8}>
            <IconButton
              sx={{
                background: likedSongs?.map(song => song._id).includes(item._id)
                  ? 'linear-gradient(to bottom, #ff8c76, #ff0d55)'
                  : darkTheme.palette.text.primary,
              }}
              onClick={event =>
                webToken
                  ? favoriteHandler(event, item._id)
                  : handleOpenLoginModal(event)
              }
            >
              <Favorite
                fontSize='small'
                sx={{
                  color: likedSongs?.map(song => song._id).includes(item._id)
                    ? darkTheme.palette.text.primary
                    : darkTheme.palette.background.default,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal} />
      <ArtistsModal
        open={openArtistsModal}
        handleClose={handleCloseArtistsModal}
        artistItems={artists}
        isLoadingData={isLoading}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={(event, reason) => handleCloseSnackbar(event, reason)}
        message={messageSnackbar}
      />
    </>
  )
}

export default AlbumSongItem
