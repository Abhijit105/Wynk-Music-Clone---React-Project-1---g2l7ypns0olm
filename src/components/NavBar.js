import { AppBar, Container, Toolbar } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
      <Container maxWidth='xl'>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'flex-start', gap: '2.4rem' }}
        >
          <NavLink to='/'>All</NavLink>
          <NavLink to='/trending'>Trending Now</NavLink>
          <NavLink to='/old'>Old Songs</NavLink>
          <NavLink to='/new'>New Songs</NavLink>
          <NavLink to='/moodsgenre'>Moods & Genre</NavLink>
          <NavLink to='/topalbums'>Top Albums</NavLink>
          <NavLink to='/topartists'>Top Artists</NavLink>
          <NavLink to='/topplaylist'>Top Playlist</NavLink>
          <NavLink to='/podcast'>Podcast</NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
