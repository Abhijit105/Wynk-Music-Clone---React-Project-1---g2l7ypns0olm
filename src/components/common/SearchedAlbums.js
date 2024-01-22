import React from 'react'
import { Box } from '@mui/material'
import SearchedAlbumItem from './SearchedAlbumItem'

function SearchedAlbums({ items }) {
  return (
    <Box padding='1.25em'>
      {items.map((item, i) => (
        <SearchedAlbumItem key={i} item={item} />
      ))}
    </Box>
  )
}

export default SearchedAlbums
