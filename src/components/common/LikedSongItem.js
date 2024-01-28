import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography } from '@mui/material'
import { darkTheme } from '../App'
import { BASEURL } from '../../config/config'
import { PlayerContext } from '../../contexts/PlayerProvider'
import ImagePlayBox from './ImagePlayBox'

function LikedSongItem({ item, i, songItems }) {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const songClickHandler = function (i) {
    setPlaylist(songItems)
    setTrack(i)
  }

  const fetchData = async () => {
    for await (const artistId of item.artist) {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASEURL}/artist/${artistId}`, {
          headers: { projectId: 'g2l7ypns0olm' },
        })
        // console.log(response)
        if (!response.ok) {
          throw new Error('Something went wrong while fetching songs for you.')
        }
        const data = await response.json()
        // console.log(data)
        const result = data.data
        setArtists(artists => [...artists, result])
      } catch (err) {
        setError(err.message)
        // console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (error) return

    fetchData()
  }, [])

  // console.log(artists)

  return (
    <Box
      width={{
        xs: 'calc((100% - 0em) / 1)',
        sm: 'calc((100% - 1em) / 2)',
        md: 'calc((100% - 3em) / 4)',
        lg: 'calc((100% - 4em) / 5)',
        xl: 'calc((100% - 5em) / 6)',
      }}
      display='flex'
      flexDirection='column'
      sx={{ cursor: 'pointer' }}
      onClick={() => songClickHandler(i)}
    >
      {/* <Box
        component={'img'}
        src={item.thumbnail}
        alt={item.title}
        width='100%'
        borderRadius='1em'
      /> */}
      <ImagePlayBox
        src={item.thumbnail}
        alt={item.title}
        width={'100%'}
        borderRadius={'1em'}
      />
      <Typography variant='subtitle1'>{item.title}</Typography>
      <Typography variant='subtitle2' color={darkTheme.palette.text.secondary}>
        {artists.map(a => a.name).join(', ')}
      </Typography>
    </Box>
  )
}

export default LikedSongItem
