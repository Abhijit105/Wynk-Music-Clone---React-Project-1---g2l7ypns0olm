import React, { useContext, useEffect } from 'react'
import banner1 from '../../assets/banner/BANNER_1.webp'
import banner2 from '../../assets/banner/BANNER_2.webp'
import banner3 from '../../assets/banner/BANNER_3.webp'
import banner4 from '../../assets/banner/BANNER_4.webp'
import banner5 from '../../assets/banner/BANNER_5.webp'
import banner6 from '../../assets/banner/BANNER_6.webp'
import banner7 from '../../assets/banner/BANNER_7.webp'
import banner8 from '../../assets/banner/BANNER_8.webp'
import banner9 from '../../assets/banner/BANNER_9.webp'
import banner10 from '../../assets/banner/BANNER_10.webp'
import banner11 from '../../assets/banner/BANNER_11.webp'
import banner12 from '../../assets/banner/BANNER_12.webp'
import banner13 from '../../assets/banner/BANNER_13.webp'
import banner14 from '../../assets/banner/BANNER_14.webp'
import banner15 from '../../assets/banner/BANNER_15.webp'
import banner16 from '../../assets/banner/BANNER_16.webp'
import BannerCarousel from '../common/BannerCarousel'
import { AllContext } from '../../contexts/AllProvider'
import Carousel from '../common/Carousel'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import CarouselWithFetch from '../common/CarouselWithFetch'
import About from '../About'
import BestWay from '../common/BestWay'
import { PlayerContext } from '../../contexts/PlayerProvider'

function All() {
  const { setPlaylist, setTrack } = useContext(PlayerContext)

  const banners = Array.from({ length: 16 }, (_, i) => `BANNER_${i + 1}.webp`)
  // console.log(banners)

  const { allSongs } = useContext(AllContext)

  // console.log(allSongs)

  const songs2023AndAbove = allSongs.filter(
    song => song?.album && Number(song.dateOfRelease.slice(0, 4)) >= 2023
  )

  const songs2022 = allSongs.filter(
    song =>
      song?.album &&
      Number(song.dateOfRelease.slice(0, 4)) >= 2022 &&
      Number(song.dateOfRelease.slice(0, 4)) < 2023
  )

  const songs2021 = allSongs.filter(
    song =>
      song?.album &&
      Number(song.dateOfRelease.slice(0, 4)) >= 2021 &&
      Number(song.dateOfRelease.slice(0, 4)) < 2022
  )

  // console.log(songs2023AndAbove)
  // console.log(songs2022)
  // console.log(songs2021)

  return (
    <>
      <BannerCarousel
        items={[
          banner1,
          banner2,
          banner3,
          banner4,
          banner5,
          banner6,
          banner7,
          banner8,
          banner9,
          banner10,
          banner11,
          banner12,
          banner13,
          banner14,
          banner15,
          banner16,
        ]}
      />
      <Box
        sx={{
          paddingX: { xs: '0', sm: '0', md: '4em', lg: '6em' },
        }}
      >
        <Carousel
          title='Songs of 2023'
          items={songs2023AndAbove}
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <Carousel
          title='Year 2022'
          items={songs2022}
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <Carousel
          title='2021: Year in focus'
          items={songs2021}
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Trending Songs'
          category='featured'
          type='Trending songs'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Top 50 of this month'
          category='featured'
          type='Top 50 of this month'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Soul soother'
          category='featured'
          type='Soul soother'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Top 20 of this week'
          category='featured'
          type='Top 20 of this week'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Evergreen melodies'
          category='featured'
          type='Evergreen melodies'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Romantic songs'
          category='mood'
          type='romantic'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Happy songs'
          category='mood'
          type='happy'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch
          title='Excited songs'
          category='mood'
          type='excited'
          onPlaylistUpdate={setPlaylist}
          onTrackUpdate={setTrack}
        />
        <CarouselWithFetch title='Sad songs' category='mood' type='sad' />
        <About />
        <BestWay />
      </Box>
    </>
  )
}

export default All
