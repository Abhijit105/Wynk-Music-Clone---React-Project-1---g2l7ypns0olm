import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Grid, useMediaQuery } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASEURL } from '../../config/config'
import ArtistSongItem from '../common/ArtistSongItem'
import { darkTheme } from '../App'
import { PlayerContext } from '../../contexts/PlayerProvider'

function Artist() {
  const [isLoading, setIsLoading] = useState(false)
  const [artist, setArtist] = useState(null)
  const [error, setError] = useState('')

  const { playlist, setPlaylist, setTrack } = useContext(PlayerContext)

  const { _id } = useParams()

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

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
      // console.log(data)
      const result = data.data
      setArtist(result)
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (error) return

    fetchData()
  }, [])

  useEffect(() => {
    setPlaylist(artist?.songs)
  }, [artist])

  // console.log(artist)
  // console.log(playlist)

  return (
    <Box
    padding={{ xs: '1.25em', sm: '2em', md: '4em', lg: '6em', xl: '6em' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
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
          {matchesMediumScreen && (
            <Grid
              container
              color='rgba(255, 255, 255, 0.7)'
              marginBottom='1em'
              flexGrow='1'
              justifyContent={'end'}
              flexWrap={'nowrap'}
            >
              <Grid
                item
                md={'auto'}
                marginRight='1em'
                key={crypto.randomUUID()}
              >
                <Typography>#</Typography>
              </Grid>
              <Grid item md={5} key={crypto.randomUUID()}>
                <Typography>Track</Typography>
              </Grid>
              <Grid item md={4} key={crypto.randomUUID()}>
                <Typography>Artists</Typography>
              </Grid>
              <Grid item md={3} key={crypto.randomUUID()}>
                <Typography>Album</Typography>
              </Grid>
              <Grid item md={'auto'} key={crypto.randomUUID()}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {!matchesMediumScreen && matchesExtraSmallScreen && (
            <Grid
              container
              color='rgba(255, 255, 255, 0.7)'
              marginBottom='1em'
              flexGrow='1'
              justifyContent={'end'}
              flexWrap={'nowrap'}
            >
              <Grid
                item
                xs={'auto'}
                marginRight='1em'
                key={crypto.randomUUID()}
              >
                <Typography>#</Typography>
              </Grid>
              <Grid item xs={12} key={crypto.randomUUID()}>
                <Typography>Track &</Typography>
                <Typography>Artists</Typography>
              </Grid>
              <Grid item xs={'auto'} key={crypto.randomUUID()}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {playlist?.map((song, i) => (
            <ArtistSongItem
              key={song._id}
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
    </Box>
  )
}

export default Artist
