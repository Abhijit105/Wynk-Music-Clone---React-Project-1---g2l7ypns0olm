import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SongItem from './SongItem'
import { BASEURL } from '../../config/config'

function FeaturedSongs({
  title,
  type,
  numberOfSongs,
  onPlaylistUpdate,
  onTrackUpdate,
}) {
  const [songItems, setSongItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BASEURL}/song?filter={"featured":"${type}"}&page=${page}&limit=20`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      // console.log(response)
      if (!response.ok) {
        setError('Something went wrong while fetching songs for you.')
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      // console.log(data)
      const songs = data.data
      setSongItems(songItems => [...songItems, ...songs])
    } catch (err) {
      // console.log(err)
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (error) return
    fetchData()
  }, [page])

  const songDisplayed = songItems[0]

  // console.log(songItems)
  // console.log(page)

  return (
    <Box
      display='flex'
      gap='2em'
      marginBottom='40px'
      alignItems='flex-start'
      width='100%'
    >
      <Box
        component={'img'}
        src={songDisplayed?.thumbnail}
        alt={songDisplayed?.title}
        maxWidth='280px'
        borderRadius='1em'
      />
      <Box flexGrow='1' display='flex' flexDirection='column'>
        <Typography variant='h4' marginBottom='1em'>
          {title}
        </Typography>
        <Grid
          container
          color='rgba(255, 255, 255, 0.7)'
          marginBottom='1em'
          flexGrow='1'
        >
          <Grid xl={'auto'} marginRight='1em'>
            <Typography>#</Typography>
          </Grid>
          <Grid xl={5}>
            <Typography>Track</Typography>
          </Grid>
          <Grid xl={3}>
            <Typography>Artists</Typography>
          </Grid>
          <Grid xl={3}>
            <Typography>Album</Typography>
          </Grid>
          <Grid xl={1}>
            <Typography>&nbsp;</Typography>
          </Grid>
        </Grid>
        {songItems.map((song, i) => (
          <SongItem
            item={song}
            i={i}
            onPlaylistUpdate={onPlaylistUpdate}
            onTrackUpdate={onTrackUpdate}
            songItems={songItems}
          />
        ))}
        {songItems.length !== numberOfSongs && (
          <Button
            variant='outlined'
            sx={{
              color: 'inherit',
              borderRadius: '100px',
              borderColor: 'inherit',
              alignSelf: 'center',
            }}
            onClick={() => setPage(page => page + 1)}
          >
            Show More
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default FeaturedSongs
