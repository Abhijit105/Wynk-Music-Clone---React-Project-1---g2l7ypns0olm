/* this is the albumstamil file at route /toptamilalbums */

import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import AlbumsPage from '../common/AlbumsPage'
import BestWay from '../common/BestWay'
import { Box } from '@mui/material'

function AlbumsTamil() {
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

  const albumsTamil = allAlbums.filter(row =>
    filterLanguage('hindi', mergeLanguage(row))
  )

  const displayedAlbums = albumsTamil.slice(0, 10)

  // console.log(albumsTamil)

  return (
    <Box
      padding='6em'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <AlbumsPage
        title='Top Tamil Albums'
        albumItems={displayedAlbums}
        isLoadingAlbum={isLoadingAlbum}
      />
      <BestWay />
    </Box>
  )
}

export default AlbumsTamil
