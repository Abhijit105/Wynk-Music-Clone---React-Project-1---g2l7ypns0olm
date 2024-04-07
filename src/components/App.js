import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import All from './routes/All'
import AllProvider from '../contexts/AllProvider'
import AppBarPrimary from './AppBarPrimary'
import AppBarSecondary from './AppBarSecondary'
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
import Podcast from './routes/Podcast'
import Search from './routes/Search'
import Artists from './routes/Artists'
import Album from './routes/Album'
import Artist from './routes/Artist'
import MyMusic from './routes/MyMusic'
import AuthProvider from '../contexts/AuthProvider'
import RequireAuth from './RequireAuth'
import FooterLink from './routes/FooterLink'
import AudioPlayerComponent from './common/AudioPlayerComponent'
import PlayerProvider from '../contexts/PlayerProvider'
import BannerLink from './routes/BannerLink'
import Subscription from './routes/Subscription'
import Payment from './routes/Payment'
import Pay from './routes/Pay'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PageNotFound from './routes/PageNotFound'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const queryClient = new QueryClient()

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  // console.log(page)
  // console.log(allSongs)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AuthProvider>
          <AllProvider searchTerm={searchTerm} searchTermUpdate={setSearchTerm}>
            <PlayerProvider>
              <BrowserRouter>
                <AppBarPrimary
                  searchTerm={searchTerm}
                  searchTermUpdate={setSearchTerm}
                />
                <AppBarSecondary />
                <Routes>
                  <Route path='/' element={<All />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/subscription' element={<Subscription />} />
                  <Route path='/payment' element={<Payment />} />
                  <Route path='/pay' element={<Pay />} />
                  <Route path='/trendingsongs' element={<Trending />} />
                  <Route path='/evergreenmelodies' element={<OldSongs />} />
                  <Route path='/new' element={<NewSongs />} />
                  <Route path='/romantic' element={<RomanticSongs />} />
                  <Route path='/happy' element={<HappySongs />} />
                  <Route path='/excited' element={<ExcitedSongs />} />
                  <Route path='/sad' element={<SadSongs />} />
                  <Route path='/tophindialbums' element={<AlbumsHindi />} />
                  <Route path='/topenglishalbums' element={<AlbumsEnglish />} />
                  <Route path='/toptamilalbums' element={<AlbumsTamil />} />
                  <Route path='/toptelugualbums' element={<AlbumsTelugu />} />
                  <Route
                    path='/topbhojpurialbums'
                    element={<AlbumsBhojpuri />}
                  />
                  <Route path='/topartists' element={<Artists />} />
                  <Route path='/top50ofthismonth' element={<Top50 />} />
                  <Route path='/top20ofthisweek' element={<Top20 />} />
                  <Route path='/soulsoother' element={<SoulSoother />} />
                  <Route path='/podcast' element={<Podcast />} />
                  <Route path='/bannerlink' element={<BannerLink />} />
                  <Route path='/footerlink' element={<FooterLink />} />
                  <Route
                    path='/albums'
                    element={
                      <Box>
                        <Outlet />
                      </Box>
                    }
                  >
                    <Route path=':_id' element={<Album />} />
                  </Route>
                  <Route
                    path='/artists'
                    element={
                      <Box>
                        <Outlet />
                      </Box>
                    }
                  >
                    <Route path=':_id' element={<Artist />} />
                  </Route>
                  <Route
                    path='/mymusic'
                    element={
                      <RequireAuth>
                        <MyMusic />
                      </RequireAuth>
                    }
                  />
                  <Route path='*' element={<PageNotFound />} />
                </Routes>
                <Footer />
                <AudioPlayerComponent />
              </BrowserRouter>
            </PlayerProvider>
          </AllProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
