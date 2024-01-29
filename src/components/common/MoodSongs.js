import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SongItem from './SongItem'
import { BASEURL } from '../../config/config'
import { darkTheme } from '../App'
import { PlayArrow } from '@mui/icons-material'

function MoodSongs({
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

  const clickHandler = function () {
    onPlaylistUpdate(songItems)
    onTrackUpdate(0)
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BASEURL}/song?filter={"mood":"${type}"}&page=${page}&limit=20`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok) {
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      // console.log(data)
      const songs = data.data
      setSongItems(songItems => [...songItems, ...songs])
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
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

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <Box
      display='flex'
      flexDirection={{
        xs: 'column',
        sm: 'column',
        md: 'row',
        lg: 'row',
        xl: 'row',
      }}
      gap='2em'
      marginBottom='40px'
      alignItems='flex-start'
      width='100%'
    >
      <Box
        component={'img'}
        src={songDisplayed?.thumbnail}
        alt={songDisplayed?.title}
        width={{ xs: '50%', sm: '50%', md: '20%' }}
        borderRadius='1em'
      />
      <Box flexGrow='1' display='flex' flexDirection='column' width={'100%'}>
        <Typography variant='h4' marginBottom='0.25em'>
          {title}
        </Typography>
        <Typography color={darkTheme.palette.text.secondary} marginBottom='1em'>
          Made by Abhijit105 | {numberOfSongs} songs
        </Typography>
        <Button
          variant='contained'
          sx={{
            alignSelf: 'flex-start',
            borderRadius: '100px',
            background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
            color: darkTheme.palette.text.primary,
            marginBottom: '1em',
          }}
          onClick={clickHandler}
        >
          <Box display={'flex'} alignItems={'center'}>
            <PlayArrow /> <Typography>Play Songs</Typography>
          </Box>
        </Button>
        {matchesMediumScreen && (
          <Grid
            container
            color='rgba(255, 255, 255, 0.7)'
            marginBottom='1em'
            flexGrow='1'
            justifyContent={'end'}
            flexWrap={'nowrap'}
          >
            <Grid item md={'auto'} marginRight='1em'>
              <Typography>#</Typography>
            </Grid>
            <Grid item md={5}>
              <Typography>Track</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Artists</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Album</Typography>
            </Grid>
            <Grid item md={'auto'}>
              <Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </Grid>
          </Grid>
        )}
        {!matchesMediumScreen && matchesExtraSmallScreen && (
          <Grid
            container
            color='rgba(255, 255, 255, 0.7)'
            marginBottom='1em'
            flexGrow='1'
            justifyContent={'end'}
            flexWrap={'nowrap'}
          >
            <Grid item xs={'auto'} sm={'auto'} marginRight='1em'>
              <Typography>#</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Track &</Typography>
              <Typography>Artists</Typography>
            </Grid>
            <Grid item xs={'auto'} sm={'auto'}>
              <Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </Grid>
          </Grid>
        )}
        {songItems.map((song, i) => (
          <SongItem
            key={i}
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

export default MoodSongs
