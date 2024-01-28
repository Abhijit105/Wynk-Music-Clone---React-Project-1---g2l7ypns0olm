import React, { useEffect } from 'react'
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Snackbar,
  useMediaQuery,
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useState } from 'react'
import LoginModal from '../../components/LoginModal'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { BASEURL3 } from '../../config/config'
import ImagePlayBox from './ImagePlayBox'

function AlbumSongItem({
  albumName,
  item,
  i,
  onPlaylistUpdate,
  onTrackUpdate,
  songItems,
  allArtists,
  isLoading,
}) {
  const [artists, setArtists] = useState([])
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [errorFavorite, setErrorFavorite] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')

  const { webToken } = useContext(AuthContext)

  const clickHandler = function (i) {
    onPlaylistUpdate(songItems)
    onTrackUpdate(i)
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

  const favoriteHandler = async function (event, songId) {
    try {
      event.stopPropagation()
      setIsLoadingFavorite(true)
      const response = await fetch(`${BASEURL3}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${webToken.token}`,
          projectId: 'g2l7ypns0olm',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId: songId }),
      })
      if (!response.ok) {
        throw new Error('Something went wrong during setting up of favorite.')
      }
      const data = await response.json()
      setMessageSnackbar(data.message)
      setOpenSnackbar(true)
      // console.log(data)
    } catch (err) {
      setErrorFavorite(err.message)
      // console.error(err.message)
    } finally {
      setIsLoadingFavorite(false)
    }
  }

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

  // console.log(item.artist)
  // console.log(allArtists)
  // console.log(artists)

  return (
    <>
      {matchesMediumScreen && (
        <Grid
          container
          marginBottom='1em'
          sx={{ cursor: 'pointer' }}
          onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
          justifyContent={'end'}
          flexWrap={'nowrap'}
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
              />
              <Typography>{item.title}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} key={3}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              {artists.map(a => a.name).join(', ')}
            </Typography>
          </Grid>
          <Grid item md={3} key={4}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              {albumName}
            </Typography>
          </Grid>
          <Grid item md={'auto'} key={5}>
            <IconButton
              sx={{
                background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
              }}
              onClick={event =>
                webToken
                  ? favoriteHandler(event, item._id)
                  : handleOpenLoginModal(event)
              }
            >
              <Favorite fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {!matchesMediumScreen && matchesExtraSmallScreen && (
        <Grid
          container
          marginBottom='1em'
          sx={{ cursor: 'pointer' }}
          onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
          justifyContent={'end'}
          flexWrap={'nowrap'}
        >
          <Grid item xs={'auto'} marginRight='1em' key={6}>
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item xs={12} key={7}>
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
              />
              <Box>
                <Typography>{item.title}</Typography>
                <Typography color='rgba(255, 255, 255, 0.7)'>
                  {artists.map(a => a.name).join(', ')}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={'auto'} key={8}>
            <IconButton
              sx={{
                background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
              }}
              onClick={event =>
                webToken
                  ? favoriteHandler(event, item._id)
                  : handleOpenLoginModal(event)
              }
            >
              <Favorite fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal} />
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
