import React, { useState } from 'react'
import { useContext } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import { Box, Typography, Grid, Button, useMediaQuery } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import SongItem from '../common/SongItem'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { PlayerContext } from '../../contexts/PlayerProvider'

function NewSongs() {
  const [page, setPage] = useState(1)

  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const { newSongs } = useContext(AllContext)

  const displayedSongs = newSongs.slice(0, page * 20)

  const songDisplayed = displayedSongs.at(0)

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

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
        <Box
          component={'img'}
          src={songDisplayed?.thumbnail}
          alt={songDisplayed?.title}
          width={{ xs: '50%', sm: '50%', md: '20%' }}
          borderRadius='1em'
        />
        <Box flexGrow='1' display='flex' flexDirection='column' width={'100%'}>
          <Typography variant='h4' marginBottom='1em'>
            New Songs
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
              <Grid item md={'auto'} marginRight='1em'>
                <Typography>#</Typography>
              </Grid>
              <Grid item md={5}>
                <Typography>Track</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography>Artists</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography>Album</Typography>
              </Grid>
              <Grid item md={'auto'}>
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
              <Grid xs={'auto'} sm={'auto'} marginRight='1em'>
                <Typography>#</Typography>
              </Grid>
              <Grid xs={12} sm={12}>
                <Typography>Track &</Typography>
                <Typography>Artists</Typography>
              </Grid>
              <Grid xs={'auto'} sm={'auto'}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {displayedSongs.map((song, i) => (
            <SongItem
              key={i}
              item={song}
              i={i}
              onPlaylistUpdate={setPlaylist}
              onTrackUpdate={setTrack}
              songItems={displayedSongs}
            />
          ))}
          {displayedSongs.length !== newSongs.length && (
            <Button
              variant='outlined'
              sx={{
                color: 'inherit',
                borderRadius: '100px',
                borderColor: 'inherit',
                alignSelf: 'center',
              }}
              onClick={() => setPage(page => page + 1)}
            >
              Show More
            </Button>
          )}
        </Box>
      </Box>
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default NewSongs
