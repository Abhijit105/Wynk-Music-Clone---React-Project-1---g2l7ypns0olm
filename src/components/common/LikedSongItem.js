import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { darkTheme } from '../App'
import { BASEURL } from '../../config/config'

function LikedSongItem({
  item,
  onPlaylistUpdate,
  onTrackUpdate,
  i,
  songItems,
}) {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const songClickHandler = function (i) {
    onPlaylistUpdate(songItems)
    onTrackUpdate(i)
  }

  const fetchData = async () => {
    for await (const artistId of item.artist) {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASEURL}/artist/${artistId}`, {
          headers: { projectId: 'g2l7ypns0olm' },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error('Something went wrong while fetching songs for you.')
        }
        const data = await response.json()
        console.log(data)
        const result = data.data
        setArtists(artists => [...artists, result])
      } catch (err) {
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(artists)

  return (
    <Box
      maxWidth='12.875em'
      display='flex'
      flexDirection='column'
      sx={{ cursor: 'pointer' }}
      onClick={() => songClickHandler(i)}
    >
      <Box
        component={'img'}
        src={item.thumbnail}
        alt={item.title}
        maxWidth='12.875em'
        borderRadius='1em'
      />
      <Typography variant='subtitle1'>{item.title}</Typography>
      <Typography variant='subtitle2' color={darkTheme.palette.text.secondary}>
        {artists.map(a => a.name).join(', ')}
      </Typography>
    </Box>
  )
}

export default LikedSongItem
