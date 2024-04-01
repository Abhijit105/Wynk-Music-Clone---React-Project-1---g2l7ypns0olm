import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { darkTheme } from '../App'
import { BASEURL } from '../../config/config'
import { PlayerContext } from '../../contexts/PlayerProvider'
import ImagePlayBox from './ImagePlayBox'
import { useQueries } from '@tanstack/react-query'
import { fetchData } from '../../utility/http'

function LikedSongItem({ item, i, songItems, isLoading }) {
  const [artists, setArtists] = useState([])

  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const songClickHandler = function (i) {
    setPlaylist(songItems)
    setTrack(i)
  }

  const combinedQueries = useQueries({
    queries: item?.artist.map(id => ({
      queryKey: ['Artist', id],
      queryFn: () => fetchData(`${BASEURL}/artist/${id}`),
      staleTime: Infinity,
      gcTime: Infinity,
    })),
    combine: results => {
      return {
        data: results.map(result => result.data),
        isLoadingArtists: results.some(result => result.isLoading),
        isPendingArtists: results.some(result => result.isPending),
        isErrorArtists: results.some(result => result.isError),
        errorArtists: results.map(result => result.error),
      }
    },
  })

  const {
    data,
    isLoadingArtists,
    isPendingArtists,
    isErrorArtists,
    errorArtists,
  } = combinedQueries

  useEffect(() => {
    if (data.some(d => !d)) return

    setArtists(data.map(obj => obj?.data))
  }, [data])

  // console.log(artists)
  // console.log(combinedQueries)
  // console.log(item)
  // console.log(isPendingArtists)
  // console.log(data)

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
        isLoadingData={isLoadingArtists || isPendingArtists || isLoading}
      />
      <Typography variant='subtitle1'>{item.title}</Typography>
      <Typography variant='subtitle2' color={darkTheme.palette.text.secondary}>
        {artists.map(a => a?.name).join(', ')}
      </Typography>
    </Box>
  )
}

export default LikedSongItem
