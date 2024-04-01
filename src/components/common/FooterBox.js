import { Box, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '../App'

function FooterBox({ title, data, onClickLinkHandler }) {
  return (
    <Box width={{ xs: '100%', sm: '45%', md: '30%', lg: '22.5%' }}>
      <Typography variant='h6'>{title}</Typography>
      <Box>
        {data.map((item, i, arr) => (
          <Box
            key={i}
            component={'span'}
            fontSize='0.75em'
            color={darkTheme.palette.text.secondary}
            sx={{ cursor: 'pointer' }}
            onClick={onClickLinkHandler}
          >
            {item}
            &nbsp;{i === arr.length - 1 ? '' : '|'}&nbsp;
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default FooterBox
