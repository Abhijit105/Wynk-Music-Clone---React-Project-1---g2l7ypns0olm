import React, { useState, useEffect, useContext } from 'react'
import SearchedSongItem from './SearchedSongItem'
import { Box, Button } from '@mui/material'
import { darkTheme } from '../App'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../contexts/AllProvider'

function SearchedSongs() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedSongs, setSearchedSongs] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  const { searchTerm } = useContext(AllContext)

  const clickHandler = function () {
    setPage(page => page + 1)
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchTerm}"}&page=${page}&limit=20`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )

        if (!response.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data = await response.json()
        // console.log(data)
        const songs = data.data
        // setSearchedSongs(searchedSongs => [...searchedSongs, ...songs])
        setSearchedSongs(songs)
      } catch (err) {
        setError(err.message)
        // console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

    return () => {
      controller.abort()
    }
  }, [searchTerm])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchTerm}"}&page=${page}&limit=20`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          }
        )

        if (!response.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data = await response.json()
        // console.log(data)
        const songs = data.data
        setSearchedSongs(searchedSongs => [...searchedSongs, ...songs])
        // setSearchedSongs(songs)
      } catch (err) {
        setError(err.message)
        // console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page])

  // console.log(searchedSongs)

  return (
    <Box display='flex' flexDirection='column' marginBottom={'4em'}>
      <Box padding='1.25em'>
        {searchedSongs.map((item, i) => (
          <SearchedSongItem key={i} item={item} isLoadingData={isLoading} />
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

export default SearchedSongs
