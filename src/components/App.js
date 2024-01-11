import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppBar } from '@mui/material'
import ResponsiveAppBar from './ResponsiveAppBar'
import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import All from './All'
import { FEATURED } from '../config/config'

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
    !isLoading && allSongs.length < 1000 && setPage(page => page + 1)
  }, [isLoading])

  console.log(page)
  console.log(allSongs)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<All />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
