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
import { BASEURL, BASEURL3 } from '../../config/config'
import ImagePlayBox from './ImagePlayBox'
import { darkTheme } from '../App'
import ArtistsModal from '../ArtistsModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import {  fetchData } from '../../utility/http'
import { PROJECTID } from '../../config/config'
import { Link, useNavigate } from 'react-router-dom'
import ErrorImage from '../../assets/img/error-image.png'

function SongItem({
  item,
  i,
  onPlaylistUpdate,
  onTrackUpdate,
  songItems,
  isLoadingItems,
}) {
  const [itemAlbum, setItemAlbum] = useState(null)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [openArtistsModal, setOpenArtistsModal] = React.useState(false)

  const navigate = useNavigate()

  const { webToken } = useContext(AuthContext)

  const clickHandler = function (i) {
    onPlaylistUpdate(songItems)
    onTrackUpdate(i)
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
    },
    onError: error => {
      setMessageSnackbar(error.response.message)
      setOpenSnackbar(true)
    },
  })

  const {
    data: dataAlbum,
    isPending: isPendingAlbum,
    isLoading: isLoadingAlbum,
    isError: isErrorAlbum,
    error: errorAlbum,
  } = useQuery({
    queryKey: ['Album', item.album],
    queryFn: () => fetchData(`${BASEURL}/album/${item?.album || ''}`),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    if (!dataAlbum) return
    setItemAlbum(dataAlbum.data)
  }, [dataAlbum])

  // console.log(item)
  // console.log(webToken.token)

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  if (isErrorAlbum || isErrorFavorite)
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
        <Box component={'img'} src={ErrorImage} alt='error' display={'flex'} width={'41.67%'} />
        <Typography variant='h5' textAlign={'center'}>{errorAlbum?.message}</Typography>
        <Typography variant='h5' textAlign={'center'}>{errorFavorite?.message}</Typography>
      </Box>
    )

  return (
    <>
      {matchesMediumScreen && (
        <Grid
          container
          padding={isHovered ? 'calc(15px)' : '1em'}
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
              {item.artist.slice(0, 4).map((a, i, arr) => (
                <Box key={a._id} component={'span'}>
                  <Link onClick={event => artistClickHandler(event, a._id)}>
                    {a.name}
                  </Link>
                  <span>{i !== arr.length - 1 ? ', ' : ''}</span>
                </Box>
              ))}
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
              <Link onClick={event => albumClickHandler(event, itemAlbum?._id)}>
                {itemAlbum?.title}
              </Link>
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
                  {item.artist.slice(0, 4).map((a, i, arr) => (
                    <Box key={a._id} component={'span'}>
                      <Link onClick={event => artistClickHandler(event, a._id)}>
                        {a.name}
                      </Link>
                      <span>{i !== arr.length - 1 ? ', ' : ''}</span>
                    </Box>
                  ))}
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
        isLoadingData={isLoadingAlbum || isPendingAlbum}
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
