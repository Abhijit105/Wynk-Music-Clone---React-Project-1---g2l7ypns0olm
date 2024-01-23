import { Box } from '@mui/material'
import React from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { useState } from 'react'

function TrendingSongs() {
  const [playlist, setPlaylist] = useState([])
  const [track, setTrack] = useState(0)

  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <FeaturedSongs
        title='Trending Songs'
        type='Trending songs'
        numberOfSongs={30}
        onPlaylistUpdate={setPlaylist}
        onTrackUpdate={setTrack}
      />
      <LoginRecommendation />
      <BestWay />
      <AudioPlayerComponent playlist={playlist} track={track} onTrackUpdate={setTrack} />
    </Box>
  )
}

export default TrendingSongs
