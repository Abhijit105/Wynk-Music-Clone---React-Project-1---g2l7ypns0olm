import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ArtistsPage from '../common/ArtistsPage'
import { Box } from '@mui/material'
import BestWay from '../common/BestWay'
import { fetchData } from '../../utility/http'
import { BASEURL } from '../../config/config'

function Artists() {
  const [artists, setArtists] = useState([])

  const {
    data: dataArtists,
    isPending: isPendingArtists,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
    error: errorArtists,
  } = useQuery({
    queryKey: ['Artists'],
    queryFn: () => fetchData(`${BASEURL}/artist/?page=1&limit=50`),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
  })

  useEffect(() => {
    if (!dataArtists) return

    setArtists(dataArtists.data)
  }, [dataArtists])

  // console.log(artists)

  return (
    <>
      <Box
        padding='6em'
        display='flex'
        flexDirection='column'
        alignItems='center'
        width='100%'
      >
        <ArtistsPage
          title='Top Artists'
          artistItems={artists}
          isLoading={isLoadingArtists || isPendingArtists}
        />
        <BestWay />
      </Box>
    </>
  )
}

export default Artists
