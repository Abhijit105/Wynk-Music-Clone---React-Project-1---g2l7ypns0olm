import React from 'react'
import FooterTop from './FooterTop'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FooterMiddle from './FooterMiddle'
import FooterBottom from './FooterBottom'

function Footer() {
  const navigate = useNavigate()

  const onClickLinkHandler = function () {
    navigate('/footerlink')
  }

  return (
    <Box
      marginBottom='6em'
      paddingX={{ xs: '1em', sm: '2em', md: '4em', lg: '6em' }}
      className='footer'
      width={'100%'}
    >
      <FooterTop onClickLinkHandler={onClickLinkHandler} />
      <FooterMiddle />
      <FooterBottom />
    </Box>
  )
}

export default Footer
