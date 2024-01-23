import { Box } from '@mui/material'
import React, { useState } from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import MoodSongs from '../common/MoodSongs'
import AudioPlayerComponent from '../common/AudioPlayerComponent'

function SadSongs() {
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
      <MoodSongs
        title='Sad Songs'
        type='sad'
        numberOfSongs={200}
        onPlaylistUpdate={setPlaylist}
        onTrackUpdate={setTrack}
      />
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

export default SadSongs
