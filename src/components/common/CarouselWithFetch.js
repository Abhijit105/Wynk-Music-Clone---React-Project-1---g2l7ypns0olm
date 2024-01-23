import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'
import { BASEURL } from '../../config/config'

function CarouselWithFetch({ title, category, type, onPlaylistUpdate, onTrackUpdate }) {
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BASEURL}/song?filter={"${category}":"${type}"}`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      console.log(data)
      const newSongs = data.data
      setSongs(songs => [...songs, ...newSongs])
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(songs)

  return (
    <Carousel
      title={title}
      items={songs}
      onPlaylistUpdate={onPlaylistUpdate}
      onTrackUpdate={onTrackUpdate}
    />
  )
}

export default CarouselWithFetch
