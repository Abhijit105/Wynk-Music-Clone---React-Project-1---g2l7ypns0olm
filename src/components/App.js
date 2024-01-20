import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppBar } from '@mui/material'

import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import All from './routes/All'
import { FEATURED } from '../config/config'
import AllSongsProvider from './AllSongsProvider'
import AppBarPrimary from './AppBarPrimary'
import AppBarSecondary from './AppBarSecondary'
import Test from './Test'
import Trending from './routes/TrendingSongs'
import Footer from './Footer'
import OldSongs from './routes/OldSongs'
import NewSongs from './routes/NewSongs'
import RomanticSongs from './routes/RomanticSongs'
import HappySongs from './routes/HappySongs'
import ExcitedSongs from './routes/ExcitedSongs'
import SadSongs from './routes/SadSongs'
import AlbumsHindi from './routes/AlbumsHindi'
import AlbumsEnglish from './routes/AlbumsEnglish'
import AlbumsTamil from './routes/AlbumsTamil'
import AlbumsTelugu from './routes/AlbumsTelugu'
import AlbumsBhojpuri from './routes/AlbumsBhojpuri'
import Top50 from './routes/Top50'
import Top20 from './routes/Top20'
import SoulSoother from './routes/SoulSoother'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [allSongs, setAllSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=100`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      console.log(data)
      const songs = data.data
      setAllSongs(allSongs => [...allSongs, ...songs])
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    !isLoading && allSongs.length < 2454 && setPage(page => page + 1)
  }, [isLoading])

  console.log(page)
  console.log(allSongs)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AllSongsProvider allSongs={allSongs}>
        <AppBarPrimary />
        <BrowserRouter>
          <AppBarSecondary />
          <Routes>
            <Route path='/' element={<All />} />
            <Route path='/trending' element={<Trending />} />
            <Route path='/old' element={<OldSongs />} />
            <Route path='/new' element={<NewSongs />} />
            <Route path='/romantic' element={<RomanticSongs />} />
            <Route path='/happy' element={<HappySongs />} />
            <Route path='/excited' element={<ExcitedSongs />} />
            <Route path='/sad' element={<SadSongs />} />
            <Route path='/tophindialbums' element={<AlbumsHindi />} />
            <Route path='/topenglishalbums' element={<AlbumsEnglish />} />
            <Route path='/toptamilalbums' element={<AlbumsTamil />} />
            <Route path='/toptelugualbums' element={<AlbumsTelugu />} />
            <Route path='/topbhojpurialbums' element={<AlbumsBhojpuri />} />
            <Route path='/top50ofthismonth' element={<Top50 />} />
            <Route path='/top20ofthisweek' element={<Top20 />} />
            <Route path='/soulsoother' element={<SoulSoother />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AllSongsProvider>
    </ThemeProvider>
  )
}

export default App
