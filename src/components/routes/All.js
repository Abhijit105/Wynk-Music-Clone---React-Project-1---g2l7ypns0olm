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
import BannerCarousel from '../BannerCarousel'
import { AllContext } from '../AllProvider'
import Carousel from '../common/Carousel'
import { BASEURL } from '../../config/config'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import CarouselWithFetch from '../common/CarouselWithFetch'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../../custom.css'
import { RHAP_UI } from 'react-h5-audio-player'
import {
  PlaylistPlay,
  PlaylistPlayRounded,
  PlaylistPlayTwoTone,
} from '@mui/icons-material'

function All() {
  const banners = Array.from({ length: 16 }, (_, i) => `BANNER_${i + 1}.webp`)
  console.log(banners)

  useEffect(() => {
    document
      .querySelector('.rhap_controls-section')
      .childNodes.forEach(node => {
        node.setAttribute('class', '')
      })
  }, [])

  const { allSongs } = useContext(AllContext)

  console.log(allSongs)

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

  console.log(songs2023AndAbove)
  console.log(songs2022)
  console.log(songs2021)

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
      <Box sx={{ paddingX: '100px' }}>
        <Carousel title='Songs of 2023' items={songs2023AndAbove} />
        <Carousel title='Year 2022' items={songs2022} />
        <Carousel title='2021: Year in focus' items={songs2021} />
        <CarouselWithFetch
          title='Trending Songs'
          category='featured'
          type='Trending songs'
        />
        <CarouselWithFetch
          title='Top 50 of this month'
          category='featured'
          type='Top 50 of this month'
        />
        <CarouselWithFetch
          title='Soul soother'
          category='featured'
          type='Soul soother'
        />
        <CarouselWithFetch
          title='Top 20 of this week'
          category='featured'
          type='Top 20 of this week'
        />
        <CarouselWithFetch
          title='Evergreen melodies'
          category='featured'
          type='Evergreen melodies'
        />
        <CarouselWithFetch
          title='Romantic songs'
          category='mood'
          type='romantic'
        />
        <CarouselWithFetch title='Happy songs' category='mood' type='happy' />
        <CarouselWithFetch
          title='Excited songs'
          category='mood'
          type='excited'
        />
        <CarouselWithFetch title='Sad songs' category='mood' type='sad' />

        <Box
          sx={{
            position: 'fixed',
            zIndex: '2',
            bottom: '0',
            width: '100%',
            left: '0',
          }}
        >
          <AudioPlayer
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
              <div className='rhap_time'>/</div>,
              RHAP_UI.DURATION,
            ]}
            customControlsSection={[
              <Paper
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                }}
              >
                <Box
                  component={'img'}
                  src=''
                  alt='song image'
                  sx={{ gridRow: '1 / 3', gridColumn: '1 / 2' }}
                />
                <Typography
                  variant='subtitle1'
                  sx={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}
                >
                  Song name
                </Typography>
                <Typography
                  variant='subtitle2'
                  sx={{ gridRow: '2 / 3', gridColumn: '2 / 3' }}
                >
                  Song album
                </Typography>
              </Paper>,
              RHAP_UI.ADDITIONAL_CONTROLS,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
              <IconButton
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: '#272727',
                  padding: '0 !important',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <PlaylistPlay />
              </IconButton>,
            ]}
            showSkipControls={true}
            showJumpControls={false}
          />
        </Box>
      </Box>
    </>
  )
}

export default All
