import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import SearchedAlbumItem from './SearchedAlbumItem'

function SearchedAlbums({ searchTerm }) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedAlbums, setSearchedAlbums] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/music/album?search={"title":"${searchTerm}"}&page=${page}&limit=20`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        if (!response.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data = await response.json()
        // console.log(data)
        const albums = data.data
        setSearchedAlbums(searchedAlbums => [...searchedAlbums, ...albums])
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
  }, [searchTerm, page])

  return (
    <Box display='flex' flexDirection='column'>
      <Box padding='1.25em'>
        {searchedAlbums.map((item, i) => (
          <SearchedAlbumItem key={i} item={item} />
        ))}
      </Box>
      <Button
        variant='contained'
        onClick={() => setPage(page => page + 1)}
        sx={{
          alignSelf: 'center',
          backgroundColor: '#272727',
        }}
        color='inherit'
      >
        Show More
      </Button>
    </Box>
  )
}

export default SearchedAlbums
