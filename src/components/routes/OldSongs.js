import { Box } from '@mui/material'
import React, { useState } from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'
import AudioPlayerComponent from '../common/AudioPlayerComponent'

function OldSongs() {
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
        title='Evergreen Melodies'
        type='Evergreen melodies'
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

export default OldSongs
