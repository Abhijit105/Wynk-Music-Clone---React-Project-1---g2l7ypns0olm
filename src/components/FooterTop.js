import { Box } from '@mui/material'
import React from 'react'
import FooterBox from './common/FooterBox'
import {
  LATESTALBUMS,
  EXPLOREMUSICGENRES,
  OLDSONGS,
  TOPARTISTS,
  REGIONALPLAYLISTS,
  LATESTSONGS,
  TRENDINGSONGS,
  SONGSWITHLYRICS,
  WYNKTOPHITS,
  DEVOTIONALSONGS,
  JOINWYNKFORARTISTS,
} from '../config/config'

function FooterTop({ onClickLinkHandler }) {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={{ xs: '0.5em', sm: '1em', md: '1.5em', lg: '2em', xl: '2.5em' }}
      flexWrap='wrap'
      marginBottom='2em'
    >
      <FooterBox
        title='Latest Albums'
        data={LATESTALBUMS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Explore Music Genres'
        data={EXPLOREMUSICGENRES}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Old Songs'
        data={OLDSONGS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Top Artists'
        data={TOPARTISTS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Regional Playlists'
        data={REGIONALPLAYLISTS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Latest Songs'
        data={LATESTSONGS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Trending Songs'
        data={TRENDINGSONGS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Songs With Lyrics'
        data={SONGSWITHLYRICS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Wynk Top Hits'
        data={WYNKTOPHITS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Devotional Songs'
        data={DEVOTIONALSONGS}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Join Wynk For Artists'
        data={JOINWYNKFORARTISTS}
        onClickLinkHandler={onClickLinkHandler}
      />
    </Box>
  )
}

export default FooterTop
