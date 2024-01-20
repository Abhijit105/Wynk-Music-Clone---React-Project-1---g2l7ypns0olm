import React, { useState } from 'react'
import { Expand, ExpandMore, KeyboardArrowDown } from '@mui/icons-material'
import {
  AppBar,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { NavLink } from 'react-router-dom'
import NavlinkList from './common/NavlinkList'

function AppBarSecondary() {
  const moodsData = ['Romantic', 'Happy', 'Excited', 'Sad']
  const topAlbumsData = ['Latest', '2022', '2021', '2020']
  const topPlaylistsData = [
    'Trending songs',
    'Top 50 of this month',
    'Soul soother',
    'Top 20 of this week',
    'Evergreen melodies',
  ]

  return (
    <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '2.4rem',
            alignItems: 'flex-start',
          }}
        >
          <NavLink to='/'>All</NavLink>
          <NavLink to='/trending'>Trending Now</NavLink>
          <NavLink to='/old'>Old Songs</NavLink>
          <NavLink to='/new'>New Songs</NavLink>
          <NavlinkList title='Moods' linkTitle='moods' data={moodsData} />
          <NavlinkList
            title='Top Albums'
            linkTitle='topalbums'
            data={topAlbumsData}
          />
          <NavLink to='/topartists'>Top Artists</NavLink>
          <NavlinkList
            title='Top Playlists'
            linkTitle='topplaylists'
            data={topPlaylistsData}
          />
          <NavLink to='/podcast'>Podcast</NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppBarSecondary
