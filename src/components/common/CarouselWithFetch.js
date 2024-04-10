import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'
import { BASEURL } from '../../config/config'
import { fetchData } from '../../utility/http'
import { useQuery } from '@tanstack/react-query'
import ErrorImage from '../../assets/img/error-image.png'
import { Box, Typography } from '@mui/material'

function CarouselWithFetch({
  title,
  category,
  type,
  onPlaylistUpdate,
  onTrackUpdate,
}) {
  const [songs, setSongs] = useState([])

  const { data, error, isLoading, isPending, isError } = useQuery({
    queryKey: ['Songs', category, type],
    queryFn: () =>
      fetchData(`${BASEURL}/song?filter={"${category}":"${type}"}`),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    setSongs(data?.data)
  }, [data])

  const isLoadingSong = isLoading || isPending

  // console.log(songs)

  if (isError)
    return (
      <Box
        height={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        gap={'1em'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={'4em'}
      >
        <Box
          component={'img'}
          src={ErrorImage}
          alt='error'
          display={'flex'}
          width={'41.67%'}
        />
        <Typography variant='h5' textAlign={'center'}>
          {error?.message}
        </Typography>
      </Box>
    )

  return (
    <Carousel
      title={title}
      items={songs}
      onPlaylistUpdate={onPlaylistUpdate}
      onTrackUpdate={onTrackUpdate}
      isLoadingSong={isLoadingSong}
    />
  )
}

export default CarouselWithFetch
