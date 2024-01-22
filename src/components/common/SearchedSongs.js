import React from 'react'
import SearchedSongItem from './SearchedSongItem'
import { Box } from '@mui/material'

function SearchedSongs({ items }) {
  return (
    <Box padding='1.25em'>
      {items.map((item, i) => (
        <SearchedSongItem key={i} item={item} />
      ))}
    </Box>
  )
}

export default SearchedSongs
