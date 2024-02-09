import React, { useState } from 'react'
import { useContext } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import { Box, Typography, Grid, Button, useMediaQuery } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import SongItem from '../common/SongItem'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { darkTheme } from '../App'
import { PlayArrow } from '@mui/icons-material'
import { AuthContext } from '../../contexts/AuthProvider'

function NewSongs({ isLoadingSong }) {
  const [page, setPage] = useState(1)

  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const { newSongs } = useContext(AllContext)

  const displayedSongs = newSongs.slice(0, page * 20)

  const songDisplayed = displayedSongs.at(0)

  const { webToken } = useContext(AuthContext)

  const playSongsClickHandler = function () {
    setPlaylist(displayedSongs)
    setTrack(0)
  }

  const showMoreClickHandler = function () {
    setPage(page => page + 1)
  }

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
        flexShrink={'0'}
        flexGrow='1'
      >
        <Box
          component={'img'}
          src={songDisplayed?.thumbnail}
          alt={songDisplayed?.title}
          width={{ xs: '50%', sm: '50%', md: '20%' }}
          borderRadius='1em'
        />
        <Box flexGrow='1' display='flex' flexDirection='column' width={'100%'}>
          <Typography variant='h4' marginBottom='0.25em'>
            New Songs
          </Typography>
          <Typography
            color={darkTheme.palette.text.secondary}
            marginBottom='1em'
          >
            Made by Abhijit105
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
              <Grid item xs={'auto'} sm={'auto'} marginRight='1em'>
                <Typography>#</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>Track & Artists</Typography>
              </Grid>
              <Grid item xs={'auto'} sm={'auto'}>
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
              isLoadingItems={isLoadingSong}
            />
          ))}
          {displayedSongs.length !== newSongs.length && (
            <Button
              variant='contained'
              sx={{
                color: 'inherit',
                borderRadius: '100px',
                borderColor: 'inherit',
                alignSelf: 'center',
                background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
              }}
              onClick={showMoreClickHandler}
            >
              Show More
            </Button>
          )}
        </Box>
      </Box>
      {!webToken && <LoginRecommendation />}
      <BestWay />
    </Box>
  )
}

export default NewSongs
