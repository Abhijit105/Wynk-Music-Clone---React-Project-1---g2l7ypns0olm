import React, { useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import BestWay from '../common/BestWay'
import LikedSongItem from '../common/LikedSongItem'
import ErrorImage from '../../assets/img/error-image.png'
import { FavoriteContext } from '../../contexts/FavoriteProvider'

function MyMusic() {
  const { likedSongs, isLoading, isPending } = useContext(FavoriteContext)

  // console.log(likedSongs)
  // console.log(data)
  // console.log(isError)

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
