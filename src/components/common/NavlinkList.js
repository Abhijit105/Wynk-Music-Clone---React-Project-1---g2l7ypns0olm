import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'

function NavlinkList({ title, data }) {
  const [moodsIsOpen, setMoodsIsOpen] = useState(false)

  const handleMoodsMouseEnter = function () {
    setMoodsIsOpen(true)
  }

  const handleMoodsMouseLeave = function () {
    setMoodsIsOpen(false)
  }

  const titleRef = useRef()

  const location = useLocation()

  useEffect(() => {
    const dataItem = data.find(
      it => it.split(' ').join('').toLowerCase() === location.pathname.slice(1)
    )
    if (dataItem) {
      titleRef.current.textContent = dataItem
    }

    return () => {
      if (dataItem) {
        titleRef.current.textContent = title
      }
    }
  }, [location])

  // console.log(location)

  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignItems: 'center',
      }}
      onMouseEnter={handleMoodsMouseEnter}
      onMouseLeave={handleMoodsMouseLeave}
    >
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Typography
          component={'a'}
          fontSize={'1.125em'}
          className='app-bar-secondary-navlink-title'
          ref={titleRef}
        >
          {title}
        </Typography>
        <ExpandMore />
      </Box>
      {moodsIsOpen && (
        <Box
          sx={{
            backgroundColor: '#272727',
            padding: '1em',
            borderRadius: '0.6em',
            position: 'absolute',
            top: '2.5em',
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
