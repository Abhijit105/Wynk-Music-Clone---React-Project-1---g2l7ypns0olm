import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AllContext } from '../AllProvider'
import SearchedSongs from '../common/SearchedSongs'
import SearchedAlbums from '../common/SearchedAlbums'

function Search() {
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchedSongs, setSearchedSongs] = useState([])
  const [searchedAlbums, setSearchedAlbums] = useState([])
  const [searchedArtists, setSearchedArtists] = useState([])

  const { searchTerm } = useContext(AllContext)

  useEffect(() => {
    const controller = new AbortController()
    const fetchDataSong = async () => {
      try {
        setIsLoading(true)
        const response1 = await fetch(
          `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchTerm}"}`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        const response2 = await fetch(
          `https://academics.newtonschool.co/api/v1/music/album?search={"title":"${searchTerm}"}`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        const response3 = await fetch(
          `https://academics.newtonschool.co/api/v1/music/artist?search={"title":"${searchTerm}"}`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        if (!response1.ok || !response2.ok || !response3.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data1 = await response1.json()
        const data2 = await response2.json()
        const data3 = await response3.json()
        console.log(data1)
        const songs = data1.data
        setSearchedSongs(songs)
        console.log(data2)
        const albums = data2.data
        setSearchedAlbums(albums)
        console.log(data3)
        const artists = data3.data
        setSearchedArtists(artists)
      } catch (err) {
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (value !== 0) return
    fetchDataSong()

    return () => {
      controller.abort()
    }
  }, [searchTerm])

  useEffect(() => {
    document.querySelector('.app-bar-secondary').style.display = 'none'
  }, [])

  console.log(searchedSongs)
  console.log(searchedAlbums)
  console.log(searchedArtists)

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
      <Box paddingX='11.75em'>
        {value === 0 && <SearchedSongs items={searchedSongs} />}
        {value === 1 && <SearchedAlbums items={searchedAlbums} />}
        {value === 2 && <Box>Artists are here</Box>}
      </Box>
    </Box>
  )
}

export default Search
