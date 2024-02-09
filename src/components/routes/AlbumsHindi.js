import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import AlbumsPage from '../common/AlbumsPage'
import BestWay from '../common/BestWay'
import { Box } from '@mui/material'

function AlbumsHindi() {
  const { allAlbums, isLoadingAlbum } = useContext(AllContext)

  function mergeLanguage(x) {
    const L = new Set()
    for (let a in Object.keys(x.artists)) {
      for (let l in x.artists[a].languages) {
        L.add(x.artists[a].languages[l])
      }
    }

    return L
  }

  function filterLanguage(lang, x) {
    return x.has(lang)
  }

  const albumsHindi = allAlbums.filter(row =>
    filterLanguage('hindi', mergeLanguage(row))
  )

  const displayedAlbums = albumsHindi.slice(0, 10)

  // console.log(albumsHindi)

  return (
    <Box
      padding='6em'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <AlbumsPage
        title='Top Hindi Albums'
        albumItems={displayedAlbums}
        isLoadingAlbum={isLoadingAlbum}
      />
      <BestWay />
    </Box>
  )
}

export default AlbumsHindi
