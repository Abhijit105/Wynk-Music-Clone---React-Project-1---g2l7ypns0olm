import React, { useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import BestWay from '../common/BestWay'
import { useState } from 'react'
import { BASEURL3 } from '../../config/config'
import { AuthContext } from '../../contexts/AuthProvider'
import LikedSongItem from '../common/LikedSongItem'

function MyMusic() {
  const [likedSongs, setLikedSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { webToken } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASEURL3}`, {
          headers: {
            Authorization: `Bearer ${webToken.token}`,
            projectId: 'g2l7ypns0olm',
          },
        })
        if (!response.ok) {
          throw new Error('Something went wrong while fetching the songs.')
        }
        const data = await response.json()
        // console.log(data)
        const result = data.data.songs
        setLikedSongs(result)
      } catch (err) {
        setError(err.message)
        // console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // console.log(likedSongs)

  return (
    <Box
      padding={{ xs: '1.25em', sm: '2em', md: '4em', lg: '6em', xl: '6em' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <Box marginBottom='4em'>
        <Typography variant='h4' marginBottom='1em'>
          Liked Songs
        </Typography>
        <Box
          display='flex'
          alignItems='flex-start'
          flexWrap='wrap'
          gap='1em'
          justifyContent='flex-start'
        >
          {likedSongs.map((song, i) => (
            <LikedSongItem key={i} item={song} i={i} songItems={likedSongs} />
          ))}
        </Box>
      </Box>
      <BestWay />
    </Box>
  )
}

export default MyMusic
