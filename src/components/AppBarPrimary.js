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
import logo from '../assets/logo/logo.png'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { InputBase, OutlinedInput, Paper } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  CurrencyRupee,
  GetApp,
  Language,
  Podcasts,
  Search,
  SpatialAudio,
} from '@mui/icons-material'
import SubscriptionModal from './LoginModal'

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

function AppBarPrimary() {
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [openModal, setOpenModal] = React.useState(false)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenModal = e => {
    e.preventDefault()
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

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
                  src={logo}
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
                />
              </Paper>
              <Box
                display='flex'
                alignItems='center'
                gap='0.2em'
                component='a'
                href='#'
                onClick={e => {
                  handleOpenModal(e)
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
              <Box
                display='flex'
                alignItems='center'
                gap='0.6em'
                component='a'
                href='#'
                onClick={e => {
                  handleOpenModal(e)
                }}
              >
                <Avatar />
                <Typography>Login</Typography>
              </Box>
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
                  <MenuItem key={i} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign='center'
                      display='flex'
                      alignItems='center'
                      gap='1rem'
                    >
                      {setting.icon}
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem
                  key={4}
                  onClick={handleCloseUserMenu}
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
      <SubscriptionModal open={openModal} handleClose={handleCloseModal} />
    </>
  )
}
export default AppBarPrimary
