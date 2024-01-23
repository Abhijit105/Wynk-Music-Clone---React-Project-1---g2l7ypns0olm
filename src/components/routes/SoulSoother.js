import { Box } from '@mui/material'
import React, { useState } from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'
import AudioPlayerComponent from '../common/AudioPlayerComponent'

function SoulSoother() {
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
        title='Soul soother'
        type='Soul soother'
        numberOfSongs={30}
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

export default SoulSoother
