import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASEURL } from '../../config/config'
import ArtistSongItem from '../common/ArtistSongItem'
import { darkTheme } from '../App'

function Artist() {
  const [isLoading, setIsLoading] = useState(false)
  const [artist, setArtist] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [track, setTrack] = useState(0)

  const { _id } = useParams()

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASEURL}/artist/${_id}`, {
        headers: { projectId: 'g2l7ypns0olm' },
      })
      if (!response.ok) {
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      console.log(data)
      const result = data.data
      setArtist(result)
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setPlaylist(artist?.songs)
  }, [artist])

  console.log(artist)
  console.log(playlist)

  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <Box
        display='flex'
        gap='2em'
        marginBottom='40px'
        alignItems='flex-start'
        width='100%'
      >
        <Box maxWidth='280px'>
          <Box
            component={'img'}
            src={artist?.image}
            alt={artist?.name}
            maxWidth='280px'
            borderRadius='50%'
            marginBottom='2em'
          />
          <Typography variant='subtitle1' fontSize='1.375em'>
            About {artist?.name}
          </Typography>
          <Typography
            variant='subtitle2'
            color={darkTheme.palette.text.secondary}
          >
            {artist?.description}
          </Typography>
        </Box>
        <Box flexGrow='1' display='flex' flexDirection='column'>
          <Typography variant='h4' marginBottom='1em'>
            {artist?.name}
          </Typography>
          <Grid
            container
            color='rgba(255, 255, 255, 0.7)'
            marginBottom='1em'
            flexGrow='1'
          >
            <Grid xl={'auto'} marginRight='1em'>
              <Typography>#</Typography>
            </Grid>
            <Grid xl={5}>
              <Typography>Track</Typography>
            </Grid>
            <Grid xl={3}>
              <Typography>Artists</Typography>
            </Grid>
            <Grid xl={3}>
              <Typography>Album</Typography>
            </Grid>
            <Grid xl={1}>
              <Typography>&nbsp;</Typography>
            </Grid>
          </Grid>
          {playlist?.map((song, i) => (
            <ArtistSongItem
              item={song}
              i={i}
              onPlaylistUpdate={setPlaylist}
              onTrackUpdate={setTrack}
              songItems={playlist}
            />
          ))}
        </Box>
      </Box>
      <LoginRecommendation />
      <BestWay />
      <AudioPlayerComponent
        playlist={playlist}
        track={track}
        onTrackUpdate={setTrack}
      />
    </Box>
  )
}

export default Artist
