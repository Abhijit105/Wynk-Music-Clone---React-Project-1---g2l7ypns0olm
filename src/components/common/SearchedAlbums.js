import React, { useState, useEffect, useContext } from 'react'
import { Box, Button } from '@mui/material'
import SearchedAlbumItem from './SearchedAlbumItem'
import { AllContext } from '../../contexts/AllProvider'
import { useDebounce } from '../useDebounce'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSearchedAlbums } from '../../utility/http'

function SearchedAlbums() {
  // const [isLoading, setIsLoading] = useState(false)
  const [searchedAlbums, setSearchedAlbums] = useState([])
  // const [page, setPage] = useState(1)
  // const [error, setError] = useState('')

  const { searchTerm } = useContext(AllContext)

  const clickHandler = function () {
    // setPage(page => page + 1)
    fetchNextPage()
  }

  // useEffect(() => {
  //   const controller = new AbortController()
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true)
  //       const response = await fetch(
  //         `https://academics.newtonschool.co/api/v1/music/album?search={"title":"${searchTerm}"}&page=${page}&limit=20`,
  //         {
  //           headers: { projectId: 'g2l7ypns0olm' },
  //         },
  //         { signal: controller.signal }
  //       )
  //       if (!response.ok)
  //         throw new Error('Something went wrong while fetching songs for you.')
  //       const data = await response.json()
  //       // console.log(data)
  //       const albums = data.data
  //       // setSearchedAlbums(searchedAlbums => [...searchedAlbums, ...albums])
  //       setSearchedAlbums(albums)
  //     } catch (err) {
  //       setError(err.message)
  //       // console.error(err.message)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchData()

  //   return () => {
  //     controller.abort()
  //   }
  // }, [searchTerm])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true)
  //       const response = await fetch(
  //         `https://academics.newtonschool.co/api/v1/music/album?search={"title":"${searchTerm}"}&page=${page}&limit=20`,
  //         {
  //           headers: { projectId: 'g2l7ypns0olm' },
  //         }
  //       )
  //       if (!response.ok)
  //         throw new Error('Something went wrong while fetching songs for you.')
  //       const data = await response.json()
  //       // console.log(data)
  //       const albums = data.data
  //       setSearchedAlbums(searchedAlbums => [...searchedAlbums, ...albums])
  //       // setSearchedAlbums(albums)
  //     } catch (err) {
  //       setError(err.message)
  //       // console.error(err.message)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   if (page === 1) return
  //   fetchData()
  // }, [page])

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
      staleTime: 1000 * 60 * 2,
      enabled: !!debouncedSearchTerm,
    })

  useEffect(() => {
    setSearchedAlbums(data?.pages.flatMap(page => page.data))
  }, [data])

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
