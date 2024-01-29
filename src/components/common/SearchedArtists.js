import React, { useState, useEffect, useContext } from 'react'
import { Box, Button } from '@mui/material'
import SearchedArtistItem from './SearchedArtistItem'
import { AllContext } from '../../contexts/AllProvider'

function SearchedArtists() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedArtists, setSearchedArtists] = useState([])
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
          `https://academics.newtonschool.co/api/v1/music/artist?search={"name":"${searchTerm}"}&page=${page}&limit=20`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        if (!response.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data = await response.json()
        // console.log(data)
        const artists = data.data
        // setSearchedArtists(searchedArtists => [...searchedArtists, ...artists])
        setSearchedArtists(artists)
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
          `https://academics.newtonschool.co/api/v1/music/artist?search={"name":"${searchTerm}"}&page=${page}&limit=20`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        if (!response.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data = await response.json()
        // console.log(data)
        const artists = data.data
        setSearchedArtists(searchedArtists => [...searchedArtists, ...artists])
        // setSearchedArtists(artists)
      } catch (err) {
        setError(err.message)
        // console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page])

  return (
    <Box display='flex' flexDirection='column' marginBottom={'4em'}>
      <Box padding='1.25em'>
        {searchedArtists.map((item, i) => (
          <SearchedArtistItem key={i} item={item} />
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
