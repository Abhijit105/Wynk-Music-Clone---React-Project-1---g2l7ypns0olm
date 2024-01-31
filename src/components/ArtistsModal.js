import React from 'react'
import { Modal, Box } from '@mui/material'

function ArtistsModal({ open, handleClose, artistItems }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '41.67%',
          height: '68.18%',
          backgroundColor: darkTheme.palette.background.default,
          color: '#272727',
          boxShadow: '0 0 0 500px #17191d',
          display: 'grid',
          gridTemplateColumns: { xs: '1', md: '42.1875% 57.8125%' },
          gridTemplateRows: '100%',
          borderRadius: '1em',
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        {artistItems.map(item => (
          <Box
            display='flex'
            key={item._id}
            alignItems='center'
            gap='1em'
            sx={{ cursor: 'pointer' }}
            onClick={() => artistClickHandler(item._id)}
          >
            <Box
              component={'img'}
              src={item.image}
              alt={item.name}
              width='5em'
              borderRadius='50%'
              onLoad={loadHandler}
            />
            {(isLoadingImage || isLoading) && (
              <span
                className='loader-artist'
                style={{ position: 'absolute' }}
              ></span>
            )}
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  )
}

export default ArtistsModal
