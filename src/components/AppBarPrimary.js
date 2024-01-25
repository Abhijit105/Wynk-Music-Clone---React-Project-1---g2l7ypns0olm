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
  Login,
  Logout,
  MusicNote,
  Password,
  Podcasts,
  Search,
  SpatialAudio,
} from '@mui/icons-material'
import LoginModal from './LoginModal'
import ComingSoonModal from './ComingSoonModal'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import PasswordChangeModal from './PasswordChangeModal'
import { SETTINGS, MOBILESETTINGS } from '../config/config'

function AppBarPrimary({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [openComingSoonModal, setOpenComingSoonModal] = React.useState(false)
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false)
  React.useState(false)

  const { webToken, logout } = useContext(AuthContext)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenLoginModal = event => {
    event.preventDefault()
    setOpenLoginModal(true)
  }

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
  }

  const handleOpenComingSoonModal = event => {
    event.preventDefault()
    setOpenComingSoonModal(true)
  }

  const handleCloseComingSoonModal = () => {
    setOpenComingSoonModal(false)
  }

  const handleOpenPasswordChangeModal = event => {
    event.preventDefault()
    setOpenPasswordChangeModal(true)
  }

  const handleClosePasswordChangeModal = () => {
    setOpenPasswordChangeModal(false)
  }

  const searchClickHandler = function () {
    navigate('/search')
  }
  const myMusicClickHandler = function()  {
    navigate('/mymusic')
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
      <AppBar
        position='relative'
        sx={{ paddingX: { xs: '0', sm: '0', md: '4em' } }}
      >
        <Container maxWidth>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box display={'flex'} gap={'0.5em'} alignItems={'center'}>
              <Box
                component={'img'}
                src={Logo}
                alt='Wynk Logo'
                width={'3em'}
                borderRadius={'50%'}
              />
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  fontFamily: 'roboto',
                  fontWeight: 700,
                  fontSize: '1.375em',
                  color: 'inherit',
                }}
              >
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
                  display: { xs: 'none', sm: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: '1em',
                  padding: '0.25em 2em',
                  borderRadius: '100px',
                  background: '#383838',
                }}
              >
                <IconButton onClick={searchClickHandler}>
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
              <IconButton
                sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
                onClick={searchClickHandler}
              >
                <Search
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                />
              </IconButton>
              <Box
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
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
                sx={{
                  borderLeft: '1px solid',
                  display: { xs: 'none', sm: 'none', md: 'flex' },
                }}
              />
              {webToken ? (
                <Box
                  display={{ xs: 'none', sm: 'none', md: 'flex' }}
                  alignItems='center'
                  gap='0.6em'
                  component='a'
                  href='#'
                  onClick={myMusicClickHandler}
                >
                  <MusicNote />
                  <Typography>My Music</Typography>
                </Box>
              ) : (
                <Box
                  display={{ xs: 'none', sm: 'none', md: 'flex' }}
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
                {webToken && (
                  <MenuItem key={10}>
                    <Typography
                      textAlign='center'
                      display='flex'
                      alignItems='center'
                      gap='1em'
                      onClick={event => handleOpenPasswordChangeModal(event)}
                    >
                      <Password />
                      Change Password
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem
                  key={9}
                  sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
                >
                  <Typography
                    textAlign='center'
                    display='flex'
                    alignItems='center'
                    gap='1em'
                    onClick={event => handleOpenLoginModal(event)}
                  >
                    <CurrencyRupee />
                    Manage Subscription
                  </Typography>
                </MenuItem>
                {webToken ? (
                  <MenuItem
                    key={8}
                    sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
                    onClick={myMusicClickHandler}
                  >
                    <Typography
                      textAlign='center'
                      display='flex'
                      alignItems='center'
                      gap='1em'
                    >
                      <MusicNote />
                      My Music
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={8}
                    sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
                    onClick={event => handleOpenLoginModal(event)}
                  >
                    <Typography
                      textAlign='center'
                      display='flex'
                      alignItems='center'
                      gap='1em'
                      
                    >
                      <Login />
                      Login
                    </Typography>
                  </MenuItem>
                )}
                {SETTINGS.map((setting, i) => (
                  <MenuItem
                    key={i}
                    onClick={event => handleOpenComingSoonModal(event)}
                  >
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
                  onClick={event => handleOpenComingSoonModal(event)}
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
      <PasswordChangeModal
        open={openPasswordChangeModal}
        handleClose={handleClosePasswordChangeModal}
      />
    </>
  )
}
export default AppBarPrimary
