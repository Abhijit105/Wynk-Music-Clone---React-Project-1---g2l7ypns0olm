import React, { useContext } from 'react'
import banner1 from '../assets/banner/BANNER_1.webp'
import banner2 from '../assets/banner/BANNER_2.webp'
import banner3 from '../assets/banner/BANNER_3.webp'
import banner4 from '../assets/banner/BANNER_4.webp'
import banner5 from '../assets/banner/BANNER_5.webp'
import banner6 from '../assets/banner/BANNER_6.webp'
import banner7 from '../assets/banner/BANNER_7.webp'
import banner8 from '../assets/banner/BANNER_8.webp'
import banner9 from '../assets/banner/BANNER_9.webp'
import banner10 from '../assets/banner/BANNER_10.webp'
import banner11 from '../assets/banner/BANNER_11.webp'
import banner12 from '../assets/banner/BANNER_12.webp'
import banner13 from '../assets/banner/BANNER_13.webp'
import banner14 from '../assets/banner/BANNER_14.webp'
import banner15 from '../assets/banner/BANNER_15.webp'
import banner16 from '../assets/banner/BANNER_16.webp'
import BannerCarousel from './BannerCarousel'
import { AllSongsContext } from './AllSongsProvider'
import Carousel from './common/Carousel'
import SubscriptionModal from './common/SubscriptionModal'

function All() {
  const banners = Array.from({ length: 16 }, (_, i) => `BANNER_${i + 1}.webp`)
  console.log(banners)

  const { allSongs } = useContext(AllSongsContext)

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

  const songs2020 = allSongs.filter(
    song =>
      song?.album &&
      Number(song.dateOfRelease.slice(0, 4)) >= 2020 &&
      Number(song.dateOfRelease.slice(0, 4)) < 2021
  )

  console.log(songs2023AndAbove)
  console.log(songs2022)
  console.log(songs2021)
  console.log(songs2020)

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
      <Carousel title='Songs of 2023' items={songs2023AndAbove} />
      <Carousel title='Year 2022' items={songs2022} />
      <Carousel title='2021: Year in focus' items={songs2021} />
      <Carousel title='2020 Songs' items={songs2020} />
    </>
  )
}

export default All
