import React, { useEffect } from 'react'
import { Grid, Box, Typography, IconButton, Snackbar } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useState } from 'react'
import { BASEURL } from '../../config/config'
import LoginModal from '../../components/LoginModal'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { BASEURL3 } from '../../config/config'
import ImagePlayBox from './ImagePlayBox'

function ArtistSongItem({
  i,
  item,
  onPlaylistUpdate,
  onTrackUpdate,
  songItems,
}) {
  const [artists, setArtists] = useState([])
  const [album, setAlbum] = useState(null)
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false)
  const [errorAlbum, setErrorAlbum] = useState('')
  const [isLoadingArtists, setIsLoadingArtists] = useState(false)
  const [errorArtists, setErrorArtists] = useState('')
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

  const fetchDataAlbum = async () => {
    try {
      setIsLoadingAlbum(true)
      const response = await fetch(`${BASEURL}/album/${item.album}`, {
        headers: { projectId: 'g2l7ypns0olm' },
      })
      // console.log(response)
      if (!response.ok) {
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      // console.log(data)
      const result = data.data
      setAlbum(result)
    } catch (err) {
      setErrorAlbum(err.message)
      // console.error(err.message)
    } finally {
      setIsLoadingAlbum(false)
    }
  }

  useEffect(() => {
    if (errorAlbum) return

    fetchDataAlbum()
  }, [])

  const fetchDataArtists = async () => {
    for await (const artistId of item.artist) {
      try {
        setIsLoadingArtists(true)
        const response = await fetch(`${BASEURL}/artist/${artistId}`, {
          headers: { projectId: 'g2l7ypns0olm' },
        })
        // console.log(response)
        if (!response.ok) {
          throw new Error('Something went wrong while fetching songs for you.')
        }
        const data = await response.json()
        // console.log(data)
        const result = data.data
        setArtists(artists => [...artists, result])
      } catch (err) {
        setErrorArtists(err.message)
        // console.error(err.message)
      } finally {
        setIsLoadingArtists(false)
      }
    }
  }

  useEffect(() => {
    if (errorArtists) return

    fetchDataArtists()
  }, [])

  // console.log(item)
  // console.log(album)

  return (
    <>
      <Grid
        container
        marginBottom='1em'
        sx={{ cursor: 'pointer' }}
        onClick={event =>
          webToken ? clickHandler(i) : handleOpenLoginModal(event)
        }
        justifyContent={'end'}
      >
        <Grid xl={'auto'} marginRight='1em'>
          <Typography>{i + 1}</Typography>
        </Grid>
        <Grid xl={5}>
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
            />
            <Typography>{item?.title}</Typography>
          </Box>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>
            {artists.map(a => a.name).join(', ')}
          </Typography>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>
            {album?.title}
          </Typography>
        </Grid>
        <Grid xl={'auto'}>
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

export default ArtistSongItem
