import React, { useState, useEffect, useContext } from 'react'
import { Box, Button } from '@mui/material'
import SearchedAlbumItem from './SearchedAlbumItem'
import { AllContext } from '../../contexts/AllProvider'
import { useDebounce } from '../useDebounce'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSearchedAlbums } from '../../utility/http'
import ErrorImage from '../../assets/img/error-image.png'

function SearchedAlbums({ activeTab }) {
  const [searchedAlbums, setSearchedAlbums] = useState([])

  const { searchTerm } = useContext(AllContext)

  const clickHandler = function () {
    fetchNextPage()
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isPending, isError, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['Albums', searchTerm],
      queryFn: ({ pageParam }) =>
        fetchSearchedAlbums(debouncedSearchTerm, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined
        }
        return lastPageParam + 1
      },
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!debouncedSearchTerm && activeTab === 1,
    })

  useEffect(() => {
    setSearchedAlbums(data?.pages.flatMap(page => page.data))
  }, [data])

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
    <Box display='flex' flexDirection='column' marginBottom={'4em'}>
      <Box>
        {searchedAlbums?.map((item, i) => (
          <SearchedAlbumItem
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

export default SearchedAlbums
