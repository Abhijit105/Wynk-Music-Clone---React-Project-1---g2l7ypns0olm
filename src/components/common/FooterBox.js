import { Box, Typography } from '@mui/material'
import React from 'react'

function FooterBox({ title, data }) {
  return (
    <Box width='25%'>
      <Typography variant='h6'>{title}</Typography>
      <Box>
        {data.map((item, i, arr) => (
          <Box key={i} component={'span'}>
            {item}
            {i === arr.length - 1 ? '' : '     |     '}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default FooterBox
