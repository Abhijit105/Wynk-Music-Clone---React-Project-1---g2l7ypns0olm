import React, { useState, useEffect, useContext } from 'react'
import { Box, Button } from '@mui/material'
import SearchedArtistItem from './SearchedArtistItem'
import { AllContext } from '../../contexts/AllProvider'
import { useDebounce } from '../useDebounce'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSearchedArtists } from '../../utility/http'

function SearchedArtists() {
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
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 30,
      enabled: !!debouncedSearchTerm,
    })

  useEffect(() => {
    if (!data) return

    setSearchedArtists(data?.pages.flatMap(page => page.data))
  }, [data])

  // console.log(searchTerm)
  // console.log(data)

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
