import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'
import { BASEURL } from '../../config/config'
import { fetchData } from '../../utility/http'
import { useQuery } from '@tanstack/react-query'

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
    staleTime: 1000 * 60 * 2,
  })

  useEffect(() => {
    setSongs(data?.data)
  }, [data])

  const isLoadingSong = isLoading || isPending

  // console.log(songs)

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
