import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import SearchedArtistItem from './SearchedArtistItem'
import { AllContext } from '../../contexts/AllProvider'
import { useDebounce } from '../useDebounce'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSearchedArtists } from '../../utility/http'
import ErrorImage from '../../assets/img/error-image.png'

function SearchedArtists({ activeTab }) {
  const [searchedArtists, setSearchedArtists] = useState([])

  const { searchTerm } = useContext(AllContext)

  const clickHandler = function () {
    fetchNextPage()
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isPending, isError, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['Artists', searchTerm],
      queryFn: ({ pageParam }) =>
        fetchSearchedArtists(debouncedSearchTerm, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined
        }
        return lastPageParam + 1
      },
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!debouncedSearchTerm && activeTab === 2,
    })

  useEffect(() => {
    if (!data) return

    setSearchedArtists(data?.pages.flatMap(page => page.data))
  }, [data])

  // console.log(searchTerm)
  // console.log(debouncedSearchTerm)
  // console.log(data)

  if (isError && error.message !== 'No more artists to display')
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
        {searchedArtists.map((item, i) => (
          <SearchedArtistItem
            key={i}
            item={item}
            isLoadingData={isLoading || isPending}
          />
        ))}
      </Box>
      <Typography variant='h5' fontWeight={'bold'}>
        {error?.message === 'No more artists to display' &&
        searchedArtists.length === 0
          ? 'No artists to display'
          : error?.message}
      </Typography>
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
    </Box>
  )
}

export default SearchedArtists
