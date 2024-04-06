import React, { useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import BestWay from '../common/BestWay'
import { useState } from 'react'
import { BASEURL3, PROJECTID } from '../../config/config'
import { AuthContext } from '../../contexts/AuthProvider'
import LikedSongItem from '../common/LikedSongItem'
import { useQuery } from '@tanstack/react-query'
import ErrorImage from '../../assets/img/error-image.png'

function MyMusic() {
  const [likedSongs, setLikedSongs] = useState([])

  const { webToken } = useContext(AuthContext)

  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: ['Favorite', 'Songs'],
    queryFn: async () => {
      const response = await fetch(`${BASEURL3}`, {
        headers: {
          Authorization: `Bearer ${webToken.token}`,
          projectID: PROJECTID,
        },
      })
      if (!response.ok)
        throw new Error('Something went wrong while fetching favorite songs.')
      const data = await response.json()
      return data
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
  })

  useEffect(() => {
    if (!data) return

    setLikedSongs(data.data.songs)
  }, [data])

  // console.log(likedSongs)
  // console.log(data)
  // console.log(isError)

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
        <Box component={'img'} src={ErrorImage} alt='error' display={'flex'} />
        <Typography variant='h5'>{error?.message}</Typography>
      </Box>
    )

  return (
    <Box
      padding={{ xs: '1.25em', sm: '2em', md: '4em', lg: '6em', xl: '6em' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <Box marginBottom='4em'>
        <Typography variant='h4' marginBottom='1em'>
          Liked Songs
        </Typography>
        <Box
          display='flex'
          alignItems='flex-start'
          flexWrap='wrap'
          gap='1em'
          justifyContent='flex-start'
        >
          {likedSongs?.map((song, i) => (
            <LikedSongItem
              key={i}
              item={song}
              i={i}
              songItems={likedSongs}
              isLoading={isLoading || isPending}
            />
          ))}
        </Box>
      </Box>
      <BestWay />
    </Box>
  )
}

export default MyMusic
