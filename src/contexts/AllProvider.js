import React, { createContext, useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '../utility/http'
import { BASEURL } from '../config/config'

export const AllContext = createContext()

function AllProvider({ children, searchTerm, searchTermUpdate }) {
  const [allAlbums, setAllAlbums] = useState([])
  const [allSongs, setAllSongs] = useState([])

  const {
    data: dataAllSongs,
    error: errorAllSongs,
    fetchNextPage: fetchNextPageAllSongs,
    hasNextPage: hasNextPageAllSongs,
    isLoading: isLoadingAllSongs,
    isPending: isPendingAllSongs,
  } = useInfiniteQuery({
    queryKey: ['Songs'],
    queryFn: ({ pageParam }) =>
      fetchData(`${BASEURL}/song/?page=${pageParam}&limit=100`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    maxPages: 26,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: hasNextPageAllSongs,
  })

  useEffect(() => {
    if (!dataAllSongs || dataAllSongs.pageParams.length === 26) return

    fetchNextPageAllSongs()
    setAllSongs(dataAllSongs?.pages.flatMap(page => page.data))
  }, [dataAllSongs])

  const {
    data: dataAllAlbums,
    isError: isErrorAllAlbums,
    error: errorAllAlbums,
    fetchNextPage: fetchNextPageAllAlbums,
    hasNextPage: hasNextPageAllAlbums,
    isLoading: isLoadingAllAlbums,
    isPending: isPendingAllAlbums,
    isFetchedAfterMount: isFetchedAfterMountAllAlbums,
  } = useInfiniteQuery({
    queryKey: ['Albums'],
    queryFn: ({ pageParam }) =>
      fetchData(`${BASEURL}/album/?page=${pageParam}&limit=100`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    maxPages: 4,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: hasNextPageAllAlbums,
  })

  useEffect(() => {
    if (!dataAllAlbums || dataAllAlbums.pageParams.length === 4) return

    fetchNextPageAllAlbums()
    setAllAlbums(dataAllAlbums?.pages.flatMap(page => page.data))
  }, [dataAllAlbums])

  // console.log(allAlbums)
  // console.log(allSongs)
  // console.log(dataAllSongs)

  const newSongs = allSongs.filter(
    song => song?.album && Number(song.dateOfRelease.slice(0, 4)) >= 2023
  )

  const isLoadingSong = isLoadingAllSongs || isPendingAllSongs

  const isLoadingAlbum = isLoadingAllAlbums || isPendingAllAlbums

  return (
    <AllContext.Provider
      value={{
        allSongs,
        searchTerm,
        searchTermUpdate,
        newSongs,
        allAlbums,
        isLoadingSong,
        isLoadingAlbum,
      }}
    >
      {children}
    </AllContext.Provider>
  )
}

export default AllProvider
