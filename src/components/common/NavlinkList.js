import React, { useState } from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

function NavlinkList({ title, data }) {
  const [moodsIsOpen, setMoodsIsOpen] = useState(false)

  const handleMoodsMouseEnter = function () {
    setMoodsIsOpen(true)
  }

  const handleMoodsMouseLeave = function () {
    setMoodsIsOpen(false)
  }

  return (
    <Box
      component={'p'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignItems: 'center',
      }}
      onMouseEnter={handleMoodsMouseEnter}
      onMouseLeave={handleMoodsMouseLeave}
    >
      <Typography
        component={'a'}
        sx={{ display: 'flex', alignItems: 'center', fontSize: '1.125em' }}
        className='app-bar-secondary-navlink-title'
      >
        {title}
        <ExpandMore />
      </Typography>
      {moodsIsOpen && (
        <Box
          sx={{
            backgroundColor: '#272727',
            padding: '1rem',
            borderRadius: '0.6rem',
            position: 'absolute',
            top: '2.50em',
            // transform: 'translateX(-22px)',
            zIndex: '1',
          }}
        >
          <List dense disablePadding={true}>
            {data.map((mood, i) => (
              <ListItem key={i} sx={{ display: 'flex', padding: '12px' }}>
                <NavLink to={`/${mood.split(' ').join('').toLowerCase()}`}>
                  <Typography sx={{ fontSize: '1.125em !important' }}>
                    {mood}
                  </Typography>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default NavlinkList
