/* this is the top artists display file at route /topartists */

import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ArtistsPage from '../common/ArtistsPage'
import { Box, Typography } from '@mui/material'
import BestWay from '../common/BestWay'
import { fetchData } from '../../utility/http'
import { BASEURL } from '../../config/config'
import ErrorImage from '../../assets/img/error-image.png'

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
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    if (!dataArtists) return

    setArtists(dataArtists.data)
  }, [dataArtists])

  // console.log(artists)

  if (isErrorArtists)
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
          {errorArtists?.message}
        </Typography>
      </Box>
    )

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
