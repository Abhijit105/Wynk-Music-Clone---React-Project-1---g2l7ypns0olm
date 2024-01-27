import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import SearchedSongs from '../common/SearchedSongs'
import SearchedAlbums from '../common/SearchedAlbums'
import SearchedArtists from '../common/SearchedArtists'
import { darkTheme } from '../App'

function Search() {
  const [value, setValue] = useState(0)

  const { searchTerm } = useContext(AllContext)

  useEffect(() => {
    document.querySelector('.app-bar-secondary').style.display = 'none'

    return () => {
      document.querySelector('.app-bar-secondary').style.display = 'flex'
    }
  }, [])

  // console.log(searchTerm)
  // console.log(value)

  return (
    <Box paddingX='100px'>
      <Tabs
        centered
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
        paddingX='11.75em'
        borderTop={`1px solid ${darkTheme.palette.divider}`}
      >
        {value === 0 && <SearchedSongs searchTerm={searchTerm} />}
        {value === 1 && <SearchedAlbums searchTerm={searchTerm} />}
        {value === 2 && <SearchedArtists searchTerm={searchTerm} />}
      </Box>
    </Box>
  )
}

export default Search
