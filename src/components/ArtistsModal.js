import React, { useState } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { darkTheme } from './App'
import { useNavigate } from 'react-router-dom'

function ArtistsModal({ open, handleClose, artistItems, isLoadingData }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  const navigate = useNavigate()

  const loadHandler = function () {
    setIsLoadingImage(false)
  }

  const artistClickHandler = function (artistId) {
    navigate(`/artists/${artistId}`)
  }

  // console.log(artistItems)

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        key={crypto.randomUUID()}
        sx={{
          padding: '1em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '58.33%', md: '41.67%' },
          height: '68.18%',
          backgroundColor: darkTheme.palette.background.default,
          color: '#fff',
          boxShadow: '0 0 0 500px #17191d',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          borderRadius: '1em',
          overflow: 'auto',
          justifyContent: 'flex-start',
        }}
      >
        <Typography fontSize={'1.5em'} marginBottom={'1em'}>
          Artists
        </Typography>
        {artistItems.map((item, i) => (
          <Box
            key={i}
            display='flex'
            flexShrink={'0'}
            alignItems='center'
            gap='1em'
            sx={{ cursor: 'pointer' }}
            onClick={() => artistClickHandler(item._id)}
          >
            <Box
              component={'img'}
              src={item?.image}
              alt={item?.name}
              width='5em'
              borderRadius='50%'
              onLoad={loadHandler}
            />
            {(isLoadingImage || isLoadingData) && (
              <span
                className='loader-artist'
                style={{ position: 'absolute' }}
              ></span>
            )}
            <Typography>{item?.name}</Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  )
}

export default ArtistsModal
