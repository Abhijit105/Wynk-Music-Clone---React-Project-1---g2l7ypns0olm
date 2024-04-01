import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SongItem from './SongItem'
import { darkTheme } from '../App'
import { PlayArrow } from '@mui/icons-material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchFeaturedSongs } from '../../utility/http'

function FeaturedSongs({
  title,
  type,
  numberOfSongs,
  onPlaylistUpdate,
  onTrackUpdate,
}) {
  const [songItems, setSongItems] = useState([])

  const playSongsClickHandler = function () {
    onPlaylistUpdate(songItems)
    onTrackUpdate(0)
  }

  const showMoreClickHandler = function () {
    // setPage(page => page + 1)
    fetchNextPage()
  }

  const { data, isError, error, fetchNextPage, isLoading, isPending } =
    useInfiniteQuery({
      queryKey: ['Songs', 'Featured Songs', type],
      queryFn: ({ pageParam }) => fetchFeaturedSongs(type, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined
        }
        return lastPageParam + 1
      },
      maxPages: 2,
      staleTime: Infinity,
      gcTime: Infinity,
    })

  useEffect(() => {
    if (!data) return

    setSongItems(data?.pages.flatMap(page => page.data))
  }, [data])

  const songDisplayed = songItems?.at(0)

  // console.log(songItems)
  // console.log(page)
  // console.log(data)

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
      flexShrink={'0'}
      flexGrow='1'
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
          onClick={playSongsClickHandler}
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
            <Grid item md={'auto'} lg={'auto'} xl={'auto'} marginRight='1em'>
              <Typography>#</Typography>
            </Grid>
            <Grid item md={5} lg={5} xl={5}>
              <Typography>Track</Typography>
            </Grid>
            <Grid item md={4} lg={4} xl={4}>
              <Typography>Artists</Typography>
            </Grid>
            <Grid item md={3} lg={3} xl={3}>
              <Typography>Album</Typography>
            </Grid>
            <Grid item md={'auto'} lg={'auto'} xl={'auto'}>
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
              <Typography>Track & Artists</Typography>
            </Grid>
            <Grid item xs={'auto'} sm={'auto'}>
              <Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </Grid>
          </Grid>
        )}
        {songItems?.map((song, i) => (
          <SongItem
            key={song._id}
            item={song}
            i={i}
            onPlaylistUpdate={onPlaylistUpdate}
            onTrackUpdate={onTrackUpdate}
            songItems={songItems}
            isLoadingItems={isLoading || isPending}
          />
        ))}

        {songItems.length !== numberOfSongs && (
          <Button
            variant='contained'
            sx={{
              color: 'inherit',
              borderRadius: '100px',
              borderColor: 'inherit',
              alignSelf: 'center',
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
            }}
            onClick={showMoreClickHandler}
          >
            Show More
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default FeaturedSongs
