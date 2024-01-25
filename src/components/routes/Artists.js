import React, { useEffect, useState } from 'react'

import ArtistsPage from '../common/ArtistsPage'
import { Box } from '@mui/material'
import BestWay from '../common/BestWay'

function Artists() {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/artist?page=1&limit=50`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      console.log(data)
      const result = data.data
      setArtists(result)
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(artists)

  return (
    <>
      <Box
        padding='6em'
        display='flex'
        flexDirection='column'
        alignItems='center'
        width='100%'
      >
        <ArtistsPage title='Top Artists' artistItems={artists} />
        <BestWay />
      </Box>
    </>
  )
}

export default Artists
