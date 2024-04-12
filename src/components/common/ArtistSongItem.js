import React, { useEffect } from 'react'
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Snackbar,
  useMediaQuery,
  Button,
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useState } from 'react'
import { BASEURL } from '../../config/config'
import LoginModal from '../../components/LoginModal'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { BASEURL3 } from '../../config/config'
import ImagePlayBox from './ImagePlayBox'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { darkTheme } from '../App'
import ArtistsModal from '../ArtistsModal'
import { useQuery, useQueries, useMutation } from '@tanstack/react-query'
import { fetchData } from '../../utility/http'
import { PROJECTID } from '../../config/config'
import { Link, useNavigate } from 'react-router-dom'
import ErrorImage from '../../assets/img/error-image.png'

function ArtistSongItem({ i, item, songItems, isLoading }) {
  const [artists, setArtists] = useState([])
  const [album, setAlbum] = useState(null)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [openArtistsModal, setOpenArtistsModal] = React.useState(false)

  const navigate = useNavigate()

  const { webToken } = useContext(AuthContext)

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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const mouseEnterHandler = function () {
    setIsHovered(true)
  }

  const mouseLeaveHandler = function () {
    setIsHovered(false)
  }

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

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
      setMessageSnackbar(error.message)
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
    setAlbum(dataAlbum.data)
  }, [dataAlbum])

  const combinedQueries = useQueries({
    queries: item.artist.map(id => ({
      queryKey: ['Artist', id],
      queryFn: () => fetchData(`${BASEURL}/artist/${id}/`),
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 30,
    })),
    combine: results => {
      return {
        data: results.map(result => result.data),
        isLoadingArtists: results.some(result => result.isLoading),
        isPendingArtists: results.some(result => result.isPending),
        isErrorArtists: results.some(result => result.isError),
        errorArtists: results.map(result => result.error),
      }
    },
  })

  const {
    data,
    isLoadingArtists,
    isPendingArtists,
    isErrorArtists,
    errorArtists,
  } = combinedQueries

  useEffect(() => {
    if (!data) return

    setArtists(data.map(obj => obj?.data))
  }, [data])

  // console.log(item)
  // console.log(album)
  // console.log(dataAlbum)
  // console.log(combinedQueries)
  // console.log(data)
  // console.log(dataFavorite)

  if (isErrorFavorite || isErrorAlbum || isErrorArtists)
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
        <Typography variant='h5' textAlign={'center'}>
          {errorAlbum?.message}
        </Typography>
        <Typography variant='h5' textAlign={'center'}>
          {errorArtists?.message}
        </Typography>
      </Box>
    )

  return (
    <>
      {matchesMediumScreen && (
        <Grid
          container
          padding={isHovered ? '15px' : '1em'}
          onClick={event =>
            webToken ? clickHandler(i) : handleOpenLoginModal(event)
          }
          justifyContent={'end'}
          flexWrap={'nowrap'}
          alignItems={'center'}
          borderRadius={'1em'}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          border={isHovered ? `1px solid ${darkTheme.palette.divider}` : 'none'}
        >
          <Grid item key={crypto.randomUUID()} md={'auto'} marginRight='1em'>
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item key={crypto.randomUUID()} md={5}>
            <Box display='flex' alignItems='center' gap='0.5em'>
              {/* <Box
              component={'img'}
              src={item?.thumbnail}
              alt={item?.title}
              maxWidth='3em'
              borderRadius='0.375em'
            /> */}
              <ImagePlayBox
                src={item?.thumbnail}
                alt={item?.title}
                width={'3em'}
                key={i}
                borderRadius={'0.375em'}
                isLoadingData={
                  isLoading ||
                  isLoadingAlbum ||
                  isPendingAlbum ||
                  isLoadingArtists ||
                  isPendingArtists
                }
              />
              <Typography>{item?.title}</Typography>
            </Box>
          </Grid>
          <Grid item key={crypto.randomUUID()} md={4}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              {artists.slice(0, 4).map((a, i, arr) => (
                <Box key={i} component={'span'}>
                  <Link onClick={event => artistClickHandler(event, a?._id)}>
                    {a?.name}
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
          <Grid item key={crypto.randomUUID()} md={3}>
            <Typography color='rgba(255, 255, 255, 0.7)'>
              <Link onClick={event => albumClickHandler(event, album?._id)}>
                {album?.title}
              </Link>
            </Typography>
          </Grid>
          <Grid item key={crypto.randomUUID()} md={'auto'}>
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
          onClick={event =>
            webToken ? clickHandler(i) : handleOpenLoginModal(event)
          }
          justifyContent={'end'}
          flexWrap={'nowrap'}
          alignItems={'center'}
          borderRadius={'1em'}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          border={isHovered ? `1px solid ${darkTheme.palette.divider}` : 'none'}
        >
          <Grid item key={crypto.randomUUID()} xs={'auto'} marginRight='1em'>
            <Typography>{i + 1}</Typography>
          </Grid>
          <Grid item key={crypto.randomUUID()} xs={12}>
            <Box display='flex' alignItems='center' gap='0.5em'>
              {/* <Box
              component={'img'}
              src={item?.thumbnail}
              alt={item?.title}
              maxWidth='3em'
              borderRadius='0.375em'
            /> */}
              <ImagePlayBox
                src={item?.thumbnail}
                alt={item?.title}
                width={'3em'}
                key={i}
                borderRadius={'0.375em'}
                isLoadingData={
                  isLoading ||
                  isLoadingAlbum ||
                  isPendingAlbum ||
                  isLoadingArtists ||
                  isPendingArtists
                }
              />
              <Box>
                <Typography>{item?.title}</Typography>
                <Typography color='rgba(255, 255, 255, 0.7)'>
                  {artists.slice(0, 4).map((a, i, arr) => (
                    <Box key={i} component={'span'}>
                      <Link
                        onClick={event => artistClickHandler(event, a?._id)}
                      >
                        {a?.name}
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
          <Grid item key={crypto.randomUUID()} xs={'auto'}>
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
        artistItems={artists}
        isLoadingData={isLoading || isLoadingArtists || isPendingArtists}
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

export default ArtistSongItem
