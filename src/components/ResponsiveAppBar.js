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
import { OutlinedInput } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const settings = ['Download App', 'Select Language', 'Sound Quality', 'Podcast']

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='#app-bar-with-responsive-menu'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'roboto',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <img src={logo} alt='Wynk logo' width='32' />
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
              <OutlinedInput
                placeholder='Search'
                size='small'
                sx={{ borderRadius: '100px' }}
              />
              <IconButton>
                <Typography>Manage Subscription</Typography>
              </IconButton>
              <Divider
                orientation='vertical'
                variant='middle'
                flexItem
                sx={{ borderLeft: '1px solid' }}
              />
              <IconButton
                sx={{
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Avatar />
                <Typography>Login</Typography>
              </IconButton>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
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
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
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
    </>
  )
}
export default ResponsiveAppBar
