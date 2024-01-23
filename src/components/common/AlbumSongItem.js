import React, { useEffect } from 'react'
import { Grid, Typography, Box, IconButton } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { BASEURL } from '../../config/config'
import { useState } from 'react'
import LoginModal from '../../components/LoginModal'
import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'

function AlbumSongItem({
  albumName,
  item,
  i,
  onPlaylistUpdate,
  onTrackUpdate,
  songItems,
  allArtists,
}) {
  const [artists, setArtists] = useState([])
  const [openLoginModal, setOpenLoginModal] = React.useState(false)

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

  useEffect(() => {
    for (const artistId of item.artist) {
      const newArtist = allArtists.find(a => a._id === artistId)
      if (newArtist) setArtists(artists => [...artists, newArtist])
    }
  }, [])

  console.log(item.artist)
  console.log(allArtists)

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
            {artists.map(a => a.name).join(', ')}
          </Typography>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>{albumName}</Typography>
        </Grid>
        <Grid xl={1}>
          <IconButton
            sx={{
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
            }}
          >
            <Favorite fontSize='small' />
          </IconButton>
        </Grid>
      </Grid>
      <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal} />
    </>
  )
}

export default AlbumSongItem
