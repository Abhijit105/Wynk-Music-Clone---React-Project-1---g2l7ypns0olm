import React, { useState } from 'react'
import {
  AppBar,
  Container,
  Toolbar,
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
} from '@mui/material'

import { NavLink } from 'react-router-dom'
import NavlinkList from './common/NavlinkList'
import {
  TOPALBUMSDATA,
  MOODSDATA,
  TOPPLAYLISTSDATA,
  NAVLINKSDATA,
} from '../config/config'
import { MoreVert } from '@mui/icons-material'

function AppBarSecondary() {
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position='static'
      color='transparent'
      sx={{ paddingX: { xs: '0', sm: '0', md: '2em', lg: '4em' } }}
      className='app-bar-secondary'
    >
      <Toolbar
        sx={{
          display: { xs: 'none', sm: 'none', md: ' none', lg: 'flex' },
          justifyContent: 'flex-start',
          gap: { xs: '0', sm: '1em', md: '1.5em', lg: '2em', xl: '2.5em' },
          alignItems: 'center',
          fontSize: '1.125em',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <NavLink className='app-bar-secondary-navlink-title' to='/'>
          All
        </NavLink>
        <NavLink
          className='app-bar-secondary-navlink-title'
          to='/trendingsongs'
        >
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
        <NavlinkList title='Moods' data={MOODSDATA} />
        <NavlinkList title='Top Albums' data={TOPALBUMSDATA} />
        <NavLink className='app-bar-secondary-navlink-title' to='/topartists'>
          Top Artists
        </NavLink>
        <NavlinkList title='Top Playlists' data={TOPPLAYLISTSDATA} />
        <NavLink className='app-bar-secondary-navlink-title' to='/podcast'>
          Podcast
        </NavLink>
      </Toolbar>
      <Toolbar
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
        }}
      >
        <Tooltip title='Open settings'>
          <IconButton onClick={event => handleOpenUserMenu(event)}>
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{
            mt: '45px',
            display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
          }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {NAVLINKSDATA.map((item, i) => (
            <MenuItem key={i}>
              <NavLink
                className={'app-bar-secondary-navlink-title'}
                to={item.link}
                onClick={handleCloseUserMenu}
              >
                {item.title}
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarSecondary
