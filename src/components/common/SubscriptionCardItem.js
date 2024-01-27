import { Box, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '../App'
import { CheckCircle } from '@mui/icons-material'

function SubscriptionCardItem({
  topText,
  middleText1,
  middleText2,
  bottomText,
  tagline,
  selectedBox,
  onSelectedBox,
  boxNumber,
}) {
  const clickHandler = function () {
    onSelectedBox(boxNumber)
  }

  return (
    <Box
      position={'relative'}
      width={'10em'}
      // display={'flex'}
      // flexDirection={'column'}
      // alignItems={'center'}
      // justifyContent={'center'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        border={`${
          selectedBox === boxNumber
            ? '2px solid rgb(235, 29, 34)'
            : `1px solid ${darkTheme.palette.action.hover}`
        }`}
        padding={'2em'}
        borderRadius={'1em'}
        position={'relative'}
        sx={{ cursor: 'pointer' }}
        onClick={clickHandler}
      >
        <Typography>{topText}</Typography>
        <Box display={'flex'} alignItems={'flex-start'}>
          <Typography variant='body1' sx={{ textDecoration: 'line-through' }}>
            {middleText1}
          </Typography>
          <Typography variant='h6'>{middleText2}</Typography>
        </Box>
        <Typography>{bottomText}</Typography>
        <CheckCircle
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor:
              selectedBox === boxNumber
                ? 'rgb(235, 29, 34)'
                : darkTheme.palette.text.secondary,
            borderRadius: '50%',
          }}
        />
      </Box>
      {tagline && (
        <Box
          component={'span'}
          width={'6em'}
          margin={'0'}
          paddingX={'0.5em'}
          borderRadius={'0.25em'}
          position={'absolute'}
          bottom={'-0.5em'}
          left={'50%'}
          sx={{
            backgroundColor: 'rgb(235, 29, 34)',
            transform: 'translate(-50%, 0)',
          }}
        >
          {tagline}
        </Box>
      )}
    </Box>
  )
}

export default SubscriptionCardItem
