import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Snackbar,
  useMediaQuery,
  Button,
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import LoginModal from '../../components/LoginModal'
import { BASEURL3 } from '../../config/config'
import ImagePlayBox from './ImagePlayBox'
import { darkTheme } from '../App'
import ArtistsModal from '../ArtistsModal'

function SongItem({
  item,
  i,
  onPlaylistUpdate,
  onTrackUpdate,
  songItems,
  isLoadingItems,
}) {
  const [itemAlbum, setItemAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [errorFavorite, setErrorFavorite] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [openArtistsModal, setOpenArtistsModal] = React.useState(false)

  const { webToken } = useContext(AuthContext)

  const clickHandler = function (i) {
    onPlaylistUpdate(songItems)
    onTrackUpdate(i)
  }

  const handleOpenLoginModal = e => {
    e.preventDefault()
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

  const favoriteHandler = async function (event, songId) {
    try {
      event.stopPropagation()
      setIsLoadingFavorite(true)
      const response = await fetch(`${BASEURL3}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${webToken?.token}`,
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
      setMessageSnackbar(err.message)
      setOpenSnackbar(true)
      // console.error(err.message)
    } finally {
      setIsLoadingFavorite(false)
    }
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album/${item.album}`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      // console.log(data)
      const album = data.data
      setItemAlbum(album)
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!item?.album) return
    if (error) return

    fetchData()
  }, [])

  // console.log(item)
  // console.log(webToken?.token)

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <>
      {matchesMediumScreen && (
        <Grid
          container
          padding={isHovered ? 'calc(15px)' : '1em'}
          sx={{ cursor: 'pointer' }}
          onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
          justifyContent={'end'}
          flexWrap={'nowrap'}
          width={'100%'}
          alignItems={'center'}
          borderRadius={'1em'}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          border={isHovered ? `1px solid ${darkTheme.palette.divider}` : 'none'}
        >
          <Grid
            item
            md={'auto'}
            lg={'auto'}
            xl={'auto'}
            marginRight='1em'
            flexShrink={'1'}
          >
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item md={5} lg={5} xl={5}>
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
                isLoadingData={isLoadingItems}
              />
              <Typography>{item.title}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} lg={4} xl={4}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              {item.artist
                .slice(0, 4)
                .map(a => a.name)
                .join(', ')}
              {item.artist.length > 4 ? '...' : ''}
              {item.artist.length > 4 && (
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
          <Grid item md={3} lg={3} xl={3}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              {itemAlbum?.title}
            </Typography>
          </Grid>
          <Grid item md={'auto'} lg={'auto'} xl={'auto'}>
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
          padding={isHovered ? '15px' : '1em'}
          sx={{ cursor: 'pointer' }}
          onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
          justifyContent={'end'}
          flexWrap={'nowrap'}
          alignItems={'center'}
          borderRadius={'1em'}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          border={isHovered ? `1px solid ${darkTheme.palette.divider}` : 'none'}
        >
          <Grid item xs={'auto'} sm={'auto'} marginRight='1em' flexShrink={'1'}>
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
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
                isLoadingData={isLoadingItems}
              />
              <Box>
                <Typography>{item.title}</Typography>
                <Typography color='rgba(255, 255, 255, 0.7)'>
                  {item.artist
                    .slice(0, 4)
                    .map(a => a.name)
                    .join(', ')}
                  {item.artist.length > 4 ? '...' : ''}
                  {item.artist.length > 4 && (
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
          <Grid item xs={'auto'} sm={'auto'}>
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
      <ArtistsModal
        open={openArtistsModal}
        handleClose={handleCloseArtistsModal}
        artistItems={item.artist}
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

export default SongItem
