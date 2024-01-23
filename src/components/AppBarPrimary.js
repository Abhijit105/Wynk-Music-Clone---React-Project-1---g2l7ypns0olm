import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import Logo from '../assets/logo/logo.png'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { InputBase, OutlinedInput, Paper } from '@mui/material'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import {
  CurrencyRupee,
  GetApp,
  Language,
  Logout,
  MusicNote,
  Podcasts,
  Search,
  SpatialAudio,
} from '@mui/icons-material'
import LoginModal from './LoginModal'
import ComingSoonModal from './ComingSoonModal'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

const settings = [
  {
    title: 'Download App',
    icon: <GetApp />,
  },
  {
    title: 'Select Language',
    icon: <Language />,
  },
  {
    title: 'Sound Quality',
    icon: <SpatialAudio />,
  },
  {
    title: 'Podcast',
    icon: <Podcasts />,
  },
]

function AppBarPrimary({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [openComingSoonModal, setOpenComingSoonModal] = React.useState(false)

  const { webToken, logout } = useContext(AuthContext)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenLoginModal = e => {
    e.preventDefault()
    setOpenLoginModal(true)
  }

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
  }

  const handleOpenComingSoonModal = () => {
    setOpenComingSoonModal(true)
  }

  const handleCloseComingSoonModal = () => {
    setOpenComingSoonModal(false)
  }

  const signOutHandler = function () {
    logout()
    navigate('/', { replace: true })
  }

  console.log(webToken)

  useEffect(() => {
    const navigateToSearchPage = function () {
      navigate('/search')
    }
    document
      .querySelector('input')
      .addEventListener('focus', navigateToSearchPage)

    return () => {
      document
        .querySelector('input')
        .removeEventListener('focus', navigateToSearchPage)
    }
  }, [])

  return (
    <>
      <AppBar position='relative' sx={{ paddingX: '60px' }}>
        <Container maxWidth='xl'>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.125em',
            }}
          >
            <Box>
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'roboto',
                  fontWeight: 700,
                  fontSize: '1.375em',
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <img
                  src={Logo}
                  alt='Wynk logo'
                  width='32'
                  style={{ borderRadius: '50%' }}
                />
                Wynk Music
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  padding: '0.25em 2em',
                  borderRadius: '100px',
                  background: '#383838',
                }}
              >
                <IconButton>
                  <Search
                    sx={{
                      position: 'absolute',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  />
                </IconButton>
                <InputBase
                  placeholder='Search Songs'
                  sx={{ backgroundColor: 'transparent' }}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Paper>
              <Box
                display='flex'
                alignItems='center'
                gap='0.2em'
                component='a'
                href='#'
                onClick={e => {
                  handleOpenLoginModal(e)
                }}
              >
                <CurrencyRupee />
                <Typography>Manage Subscription</Typography>
              </Box>
              <Divider
                orientation='vertical'
                variant='middle'
                flexItem
                sx={{ borderLeft: '1px solid' }}
              />
              {webToken ? (
                <Box
                  display='flex'
                  alignItems='center'
                  gap='0.6em'
                  component='a'
                  href='#'
                  onClick={() => {
                    navigate('/mymusic')
                  }}
                >
                  <MusicNote />
                  <Typography>My Music</Typography>
                </Box>
              ) : (
                <Box
                  display='flex'
                  alignItems='center'
                  gap='0.6em'
                  component='a'
                  href='#'
                  onClick={e => {
                    handleOpenLoginModal(e)
                  }}
                >
                  <Avatar />
                  <Typography>Login</Typography>
                </Box>
              )}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                {settings.map((setting, i) => (
                  <MenuItem key={i} onClick={handleOpenComingSoonModal}>
                    <Typography
                      textAlign='center'
                      display='flex'
                      alignItems='center'
                      gap='1em'
                    >
                      {setting.icon}
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
                {webToken ? (
                  <MenuItem key={'signout'} onClick={signOutHandler}>
                    <Typography
                      textAlign='center'
                      display='flex'
                      alignItems='center'
                      gap='1em'
                    >
                      <Logout />
                      Sign Out
                    </Typography>
                  </MenuItem>
                ) : null}
                <Divider />
                <MenuItem
                  key={4}
                  onClick={handleOpenComingSoonModal}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography textAlign='center'>
                    Join Wynk for Artists
                  </Typography>
                  <Typography
                    component='p'
                    fontSize='10px'
                    marginTop='1rem'
                    textAlign='left'
                    fontWeight='300'
                  >
                    Sign up as an Artist on Wynk
                    <br /> Studio and release your original
                    <br /> songs on Wynk
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal} />
      <ComingSoonModal
        open={openComingSoonModal}
        handleClose={handleCloseComingSoonModal}
      />
    </>
  )
}
export default AppBarPrimary
