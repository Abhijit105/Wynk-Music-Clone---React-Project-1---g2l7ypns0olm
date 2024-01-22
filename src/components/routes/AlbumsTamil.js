import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../AllProvider'
import AlbumsPage from '../common/AlbumsPage'
import BestWay from '../common/BestWay'
import Footer from '../Footer'
import { Box } from '@mui/material'

function AlbumsTamil() {
  const { allAlbums } = useContext(AllContext)

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

  console.log(albumsTamil)

  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <AlbumsPage title='Top Tamil Albums' albumItems={displayedAlbums} />
      <BestWay />
    </Box>
  )
}

export default AlbumsTamil
