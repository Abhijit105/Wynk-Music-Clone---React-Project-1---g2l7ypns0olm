import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import ComingSoon from '../common/ComingSoon'

function Pay() {
  useEffect(() => {
    document.querySelector('.app-bar-primary').style.display = 'none'
    document.querySelector('.app-bar-secondary').style.display = 'none'
    document.querySelector('.footer').style.display = 'none'
    document.querySelector('.audio-player-component').style.display = 'none'

    return () => {
      document.querySelector('.app-bar-primary').style.display = 'flex'
      document.querySelector('.app-bar-secondary').style.display = 'flex'
      document.querySelector('.footer').style.display = 'flex'
      document.querySelector('.audio-player-component').style.display = 'flex'
    }
  }, [])

  return (
    <Box>
      <ComingSoon />
    </Box>
  )
}

export default Pay
