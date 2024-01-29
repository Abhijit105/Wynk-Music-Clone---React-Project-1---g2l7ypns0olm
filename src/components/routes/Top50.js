import { Box } from '@mui/material'
import React, { useContext, useState } from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { AuthContext } from '../../contexts/AuthProvider'

function Top50() {
  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const { webToken } = useContext(AuthContext)

  return (
    <Box
      padding={{ xs: '1.25em', sm: '2em', md: '4em', lg: '6em', xl: '6em' }}
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
      {!webToken && <LoginRecommendation />}
      <BestWay />
    </Box>
  )
}

export default Top50
