import React, { useState, useEffect } from 'react'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import LoginModal from '../../components/LoginModal'
import { BASEURL3 } from '../../config/config'

function SongItem({ item, i, onPlaylistUpdate, onTrackUpdate, songItems }) {
  const [itemAlbum, setItemAlbum] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)

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
      console.log(data)
    } catch (err) {
      console.error(err.message)
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
      console.log(data)
      const album = data.data
      setItemAlbum({ ...album })
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!item?.album) return
    fetchData()
  }, [])

  console.log(item)
  console.log(webToken?.token)

  return (
    <>
      <Grid
        container
        marginBottom='1em'
        sx={{ cursor: 'pointer' }}
        onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
      >
        <Grid xl={'auto'} marginRight='1em'>
          <Typography>{i + 1}</Typography>
        </Grid>
        <Grid xl={4}>
          <Box display='flex' alignItems='center' gap='0.5em'>
            <Box
              component={'img'}
              src={item.thumbnail}
              alt={item.title}
              maxWidth='3em'
              borderRadius='0.375em'
            />
            <Typography>{item.title}</Typography>
          </Box>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>
            {item.artist.map(a => a.name).join(', ')}
          </Typography>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>
            {itemAlbum?.title}
          </Typography>
        </Grid>
        <Grid xl={1}>
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
    </>
  )
}

export default SongItem
