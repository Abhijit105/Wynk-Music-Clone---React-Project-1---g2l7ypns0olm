import React, { useState, useEffect, useContext } from 'react'
import SearchedSongItem from './SearchedSongItem'
import { Box, Button, Typography } from '@mui/material'
import { AllContext } from '../../contexts/AllProvider'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSearchedSongs } from '../../utility/http'
import { useDebounce } from '../useDebounce'
import ErrorImage from '../../assets/img/error-image.png'

function SearchedSongs({ activeTab }) {
  const [searchedSongs, setSearchedSongs] = useState([])

  const { searchTerm } = useContext(AllContext)

  const clickHandler = function () {
    fetchNextPage()
  }

  // console.log(searchedSongs)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isPending, isError, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['Songs', searchTerm],
      queryFn: ({ pageParam }) =>
        fetchSearchedSongs(debouncedSearchTerm, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined
        }
        return lastPageParam + 1
      },
      staleTime: Infinity,
      gcTime: Infinity,
      enabled:
        !!debouncedSearchTerm &&
        activeTab === 0 &&
        typeof searchedSongs?.length === 'number',
    })

  useEffect(() => {
    if (!data) return

    setSearchedSongs(data?.pages.flatMap(page => page.data))
  }, [data])

  // console.log(error)
  // console.log(searchedSongs)
  // console.log(data)

  if (isError && error.message !== 'No more songs to display')
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
    <Box display='flex' flexDirection='column' marginBottom={'4em'}>
      <Box>
        {searchedSongs?.map((item, i) => (
          <SearchedSongItem
            key={i}
            item={item}
            isLoadingData={isLoading || isPending}
          />
        ))}
      </Box>
      {searchedSongs && searchedSongs.length !== 0 ? (
        <Button
          variant='contained'
          onClick={clickHandler}
          sx={{
            alignSelf: 'center',
            background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
          }}
          color='inherit'
        >
          Show More
        </Button>
      ) : (
        <Typography variant='h4' textAlign={'center'}>
          Nothing to display. Type a song to get started.
        </Typography>
      )}
    </Box>
  )
}

export default SearchedSongs
