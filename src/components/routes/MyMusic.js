import React, { useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import BestWay from '../common/BestWay'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASEURL3 } from '../../config/config'
import { AuthContext } from '../AuthProvider'
import AudioPlayerComponent from '../common/AudioPlayerComponent'

function MyMusic() {
  const [likedSongs, setLikedSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [track, setTrack] = useState(0)

  const { webToken } = useContext(AuthContext)

  const navigate = useNavigate()

  const songClickHandler = function (i) {
    setPlaylist(likedSongs)
    setTrack(i)
  }

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
        console.log(data)
        const result = data.data.songs
        setLikedSongs(result)
      } catch (err) {
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setPlaylist(likedSongs)
  }, [likedSongs])

  console.log(likedSongs)

  return (
    <Box
      padding='100px'
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
            <Box
              key={i}
              maxWidth='12.875em'
              sx={{ cursor: 'pointer' }}
              onClick={() => songClickHandler(i)}
            >
              <Box
                component={'img'}
                src={song.thumbnail}
                alt={song.title}
                maxWidth='12.875em'
                borderRadius='1em'
              />
            </Box>
          ))}
        </Box>
      </Box>
      <BestWay />
      <AudioPlayerComponent
        onTrackUpdate={setTrack}
        playlist={playlist}
        track={track}
      />
    </Box>
  )
}

export default MyMusic
