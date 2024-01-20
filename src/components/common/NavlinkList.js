import React, { useState } from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

function NavlinkList({ title, linkTitle, data }) {
  const [moodsIsOpen, setMoodsIsOpen] = useState(false)

  const handleMoodsMouseEnter = function () {
    setMoodsIsOpen(true)
  }

  const handleMoodsMouseLeave = function () {
    setMoodsIsOpen(false)
  }

  return (
    <Box
      component={'a'}
      sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onMouseEnter={handleMoodsMouseEnter}
      onMouseLeave={handleMoodsMouseLeave}
    >
      <Typography
        component={'a'}
        sx={{ display: 'flex', alignItems: 'center' }}
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
            top: '24px',
            // transform: 'translateX(-22px)',
            zIndex: '1',
          }}
        >
          <List dense disablePadding={true}>
            {data.map(mood => (
              <ListItem sx={{ display: 'flex', padding: '12px' }}>
                <NavLink
                  to={`/${linkTitle}-${mood.split(' ').join('').toLowerCase()}`}
                >
                  <ListItemText primary={`${mood}`} sx={{ margin: '0' }} />
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
