import { Box } from '@mui/material'
import React, { useContext, useState } from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { PlayerContext } from '../../contexts/PlayerProvider'

function Top50() {
  const { setPlaylist, setTrack } = useContext(PlayerContext)

  return (
    <Box
      padding='6em'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <FeaturedSongs
        title='Top 50 of this month'
        type='Top 50 of this month'
        numberOfSongs={50}
        onPlaylistUpdate={setPlaylist}
        onTrackUpdate={setTrack}
      />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default Top50
