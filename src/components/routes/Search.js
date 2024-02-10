import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchedSongs from '../common/SearchedSongs'
import SearchedAlbums from '../common/SearchedAlbums'
import SearchedArtists from '../common/SearchedArtists'
import { darkTheme } from '../App'

function Search() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    document.querySelector('.app-bar-secondary').style.display = 'none'

    return () => {
      document.querySelector('.app-bar-secondary').style.display = 'flex'
    }
  }, [])

  // console.log(searchTerm)
  // console.log(value)

  return (
    <Box paddingX={{ xs: '1em', sm: '2em', md: '4em', lg: '6em' }}>
      <Tabs
        centered
        textColor='inherit'
        value={value}
        onChange={(e, val) => {
          setValue(val)
        }}
      >
        <Tab label='Songs' />
        <Tab label='Albums' />
        <Tab label='Artists' />
      </Tabs>
      <Box
        paddingX={{ xs: '1em', sm: '2em', md: '4em', lg: '6em', xl: '11.75em' }}
        paddingY={{ xs: '1em', md: '1.5em', xl: '2em' }}
        borderTop={`1px solid ${darkTheme.palette.divider}`}
      >
        {value === 0 && <SearchedSongs />}
        {value === 1 && <SearchedAlbums />}
        {value === 2 && <SearchedArtists />}
      </Box>
    </Box>
  )
}

export default Search
