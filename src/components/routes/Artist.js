import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Grid, useMediaQuery, Button } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASEURL } from '../../config/config'
import ArtistSongItem from '../common/ArtistSongItem'
import { darkTheme } from '../App'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { PlayArrow } from '@mui/icons-material'
import { AuthContext } from '../../contexts/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '../../utility/http'

function Artist() {
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState([])
  const [isLoadingImageArtist, setIsLoadingImageArtist] = useState(true)

  const { playlist, setPlaylist, setTrack } = useContext(PlayerContext)

  const { _id } = useParams()

  const { webToken } = useContext(AuthContext)

  const playSongsClickHandler = function () {
    setPlaylist(songs)
    setTrack(0)
  }

  const loadHandlerArtist = function () {
    setIsLoadingImageArtist(false)
  }

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  const isLoading = isLoadingArtist || isPendingArtist

  const {
    data: dataArtist,
    isPending: isPendingArtist,
    isLoading: isLoadingArtist,
    isError: isErrorArtist,
    error: errorArtist,
  } = useQuery({
    queryKey: ['Artist', _id],
    queryFn: () => fetchData(`${BASEURL}/artist/${_id}`),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    if (!dataArtist) return

    setArtist(dataArtist.data)
    setSongs(dataArtist.data.songs)
  }, [dataArtist])

  // console.log(artist)
  // console.log(songs)

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
        <Box width={{ xs: '50%', md: '20%' }} flexShrink={'0'} flexGrow='1'>
          <Box
            display={'flex'}
            position={'relative'}
            width={'100%'}
            height={'100%'}
            marginBottom='2em'
          >
            <Box
              component={'img'}
              src={artist?.image}
              alt={artist?.name}
              width={'100%'}
              borderRadius='50%'
              onLoad={loadHandlerArtist}
            />
            {(isLoadingImageArtist || isLoading) && (
              <Box
                display={'flex'}
                position={'absolute'}
                width={'100%'}
                height={'100%'}
              >
                <span
                  className='loader-artist'
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                ></span>
              </Box>
            )}
          </Box>
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
        <Box flexGrow='1' display='flex' flexDirection='column' width={'100%'}>
          <Typography variant='h4' marginBottom='0.25em'>
            {artist?.name}
          </Typography>
          <Typography
            color={darkTheme.palette.text.secondary}
            marginBottom='1em'
          >
            Made by Abhijit105 | {songs.length} songs
          </Typography>
          <Button
            variant='contained'
            sx={{
              alignSelf: 'flex-start',
              borderRadius: '100px',
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
              color: darkTheme.palette.text.primary,
              marginBottom: '1em',
            }}
            onClick={playSongsClickHandler}
          >
            <Box display={'flex'} alignItems={'center'}>
              <PlayArrow /> <Typography>Play Songs</Typography>
            </Box>
          </Button>
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
                <Typography>Track & Artists</Typography>
              </Grid>
              <Grid item xs={'auto'} key={crypto.randomUUID()}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {songs?.map((song, i) => (
            <ArtistSongItem
              key={song._id}
              item={song}
              i={i}
              songItems={songs}
              isLoading={isLoading}
            />
          ))}
        </Box>
      </Box>
      {!webToken && <LoginRecommendation />}
      <BestWay />
    </Box>
  )
}

export default Artist
