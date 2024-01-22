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
  const topAlbumsData = [
    'Top Hindi Albums',
    'Top English Albums',
    'Top Telugu Albums',
    'Top Tamil Albums',
    'Top Bhojpuri Albums',
  ]
  const topPlaylistsData = [
    'Trending songs',
    'Top 50 of this month',
    'Soul soother',
    'Top 20 of this week',
    'Evergreen melodies',
  ]

  return (
    <AppBar
      position='static'
      color='transparent'
      sx={{ boxShadow: 'none', paddingX: '60px' }}
      className='app-bar-secondary'
    >
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '2.4rem',
            alignItems: 'center',
            fontSize: '1.125em',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <NavLink className='app-bar-secondary-navlink-title' to='/'>
            All
          </NavLink>
          <NavLink className='app-bar-secondary-navlink-title' to='/trending'>
            Trending Now
          </NavLink>
          <NavLink
            className='app-bar-secondary-navlink-title'
            to='/evergreenmelodies'
          >
            Old Songs
          </NavLink>
          <NavLink className='app-bar-secondary-navlink-title' to='/new'>
            New Songs
          </NavLink>
          <NavlinkList title='Moods' data={moodsData} />
          <NavlinkList title='Top Albums' data={topAlbumsData} />
          <NavLink className='app-bar-secondary-navlink-title' to='/topartists'>
            Top Artists
          </NavLink>
          <NavlinkList title='Top Playlists' data={topPlaylistsData} />
          <NavLink className='app-bar-secondary-navlink-title' to='/podcast'>
            Podcast
          </NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppBarSecondary
