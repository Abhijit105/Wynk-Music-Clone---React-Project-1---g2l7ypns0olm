import React, { useState } from 'react'
import { useContext } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import { Box, Typography, Grid, Button } from '@mui/material'
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

  return (
    <Box
      padding='6em'
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
        <Box
          component={'img'}
          src={songDisplayed?.thumbnail}
          alt={songDisplayed?.title}
          maxWidth='280px'
          borderRadius='1em'
        />
        <Box flexGrow='1' display='flex' flexDirection='column'>
          <Typography variant='h4' marginBottom='1em'>
            New Songs
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
