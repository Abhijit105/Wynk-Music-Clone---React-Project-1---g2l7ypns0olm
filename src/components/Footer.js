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
    <Box marginBottom='2em' padding='100px'>
      <FooterTop onClickLinkHandler={onClickLinkHandler} />
      <FooterMiddle />
      <FooterBottom />
    </Box>
  )
}

export default Footer
