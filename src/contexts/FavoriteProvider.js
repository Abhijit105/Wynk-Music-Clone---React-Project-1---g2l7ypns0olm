import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { BASEURL3, PROJECTID } from '../config/config'
import { useQuery } from '@tanstack/react-query'
import { Box, Typography } from '@mui/material'
import ErrorImage from '../assets/img/error-image.png'

export const FavoriteContext = createContext()

function FavoriteProvider({ children }) {
  const [likedSongs, setLikedSongs] = useState([])
  const [refetchLikedSongs, setRefetchLikedSongs] = useState(false)

  const { webToken } = useContext(AuthContext)

  const { data, isLoading, isPending, isError, error, refetch } = useQuery({
    queryKey: ['Favorite', 'Songs'],
    queryFn: async () => {
      const response = await fetch(`${BASEURL3}`, {
        headers: {
          Authorization: `Bearer ${webToken?.token}`,
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
    enabled: !!webToken,
  })

  useEffect(() => {
    if (!data) return

    setLikedSongs(data.data.songs)
  }, [data])

  useEffect(() => {
    if (!refetchLikedSongs) return

    refetch()
    setRefetchLikedSongs(false)
  }, [refetchLikedSongs])

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
    <FavoriteContext.Provider
      value={{
        likedSongs,
        setLikedSongs,
        isLoading,
        isPending,
        refetchLikedSongs,
        setRefetchLikedSongs,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteProvider
