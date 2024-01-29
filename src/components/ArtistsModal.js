import React from 'react'
import { Modal, Box } from '@mui/material'

function ArtistsModal() {
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
      ></Box>
    </Modal>
  )
}

export default ArtistsModal
