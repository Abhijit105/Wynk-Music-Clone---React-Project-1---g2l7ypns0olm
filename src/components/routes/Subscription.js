import {
  Box,
  Divider,
  Paper,
  Typography,
  Grid,
  Link,
  Button,
} from '@mui/material'
import React from 'react'
import Crown from '../../assets/img/crown.png'
import WynkImage from '../../assets/img/WynkImage.svg'
import { SUBSCRIPTIONDATA } from '../../config/config'
import SubscriptionCardItem from '../common/SubscriptionCardItem'
import { darkTheme } from '../App'
import { useState } from 'react'
import { CheckCircle } from '@mui/icons-material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Subscription() {
  const [selectedBox, setSelectedBox] = useState(1)
  const [amount, setAmount] = useState(undefined)

  const helloTuneClickHandler = function () {
    setSelectedBox(4)
  }

  const navigate = useNavigate()

  const clickHandler = function () {
    navigate(`/payment?amount=${amount}`)
  }

  useEffect(() => {
    selectedBox === 1 && setAmount(399)
    selectedBox === 2 && setAmount(129)
    selectedBox === 3 && setAmount(49)
    selectedBox === 4 && setAmount(19)
  }, [selectedBox])

  useEffect(() => {
    document.querySelector('.app-bar-primary').style.display = 'none'
    document.querySelector('.app-bar-secondary').style.display = 'none'
    document.querySelector('.footer').style.display = 'none'
    document.querySelector('.audio-player-component').style.display = 'none'

    return () => {
      document.querySelector('.app-bar-primary').style.display = 'flex'
      document.querySelector('.app-bar-secondary').style.display = 'flex'
      document.querySelector('.footer').style.display = 'block'
      document.querySelector('.audio-player-component').style.display = 'flex'
    }
  }, [])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'60%'}
      margin={'auto'}
    >
      <Box
        component={'img'}
        src={WynkImage}
        alt='Wynk image'
        marginBottom={'5em'}
        width={'12em'}
      />
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderRadius: '1em',
          color: darkTheme.palette.text.secondary,
          overflow: 'hidden',
          marginBottom: '1.5em',
        }}
      >
        <Box
          padding={'1em 1em 0'}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box display={'flex'} alignItems={'center'}>
            <Typography variant='h5' color={'rgb(235, 29, 34)'}>
              Go Premium
            </Typography>
            <Box component={'img'} src={Crown} alt='crown' width={'2em'} />
          </Box>
          <Typography variant='caption'>
            Get the best of music and podcasts
          </Typography>
          <Box width={'100%'}>
            <Grid
              container
              color={darkTheme.palette.text.disabled}
              flexGrow='1'
              justifyContent={'space-between'}
              fontStyle={'italic'}
            >
              <Grid item key={crypto.randomUUID()} xs={6} md={8}>
                <Typography>Benefits</Typography>
              </Grid>
              <Grid item key={crypto.randomUUID()} xs={3} md={2}>
                <Typography>Now</Typography>
              </Grid>
              <Grid item key={crypto.randomUUID()} xs={3} md={2}>
                <Typography>Premium</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: '1em' }} />
            {SUBSCRIPTIONDATA.map((item, i) => (
              <Grid
                container
                key={i}
                marginBottom='1em'
                justifyContent={'space-between'}
              >
                <Grid item key={crypto.randomUUID()} xs={6} md={8}>
                  <Typography>{item.title}</Typography>
                </Grid>
                <Grid item key={crypto.randomUUID()} xs={3} md={2}>
                  {item.nowIcon}
                </Grid>
                <Grid item key={crypto.randomUUID()} xs={3} md={2}>
                  {item.premiumIcon}
                </Grid>
              </Grid>
            ))}
          </Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={{ xs: '1em', lg: '2em' }}
            marginBottom={'1em'}
          >
            <SubscriptionCardItem
              key={crypto.randomUUID()}
              topText='Yearly'
              middleText1='₹999'
              middleText2='₹399'
              bottomText='Save 60%'
              tagline='Best Value'
              selectedBox={selectedBox}
              onSelectedBox={setSelectedBox}
              boxNumber={1}
              onClick={() => setSelectedBox(1)}
            />

            <SubscriptionCardItem
              key={crypto.randomUUID()}
              topText='3 Months'
              middleText1='₹289'
              middleText2='₹129'
              bottomText='Save 55%'
              selectedBox={selectedBox}
              onSelectedBox={setSelectedBox}
              boxNumber={2}
              onClick={() => setSelectedBox(2)}
            />

            <SubscriptionCardItem
              key={crypto.randomUUID()}
              topText='Monthly'
              middleText1='₹99'
              middleText2='₹49'
              bottomText='Save 50%'
              selectedBox={selectedBox}
              onSelectedBox={setSelectedBox}
              boxNumber={3}
              onClick={() => setSelectedBox(3)}
            />
          </Box>
        </Box>
        <Typography
          variant='subtitle2'
          fontSize={'0.75em'}
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            padding: '1em',
            fontStyle: 'italic',
            backgroundColor: darkTheme.palette.divider,
          }}
        >
          Current plan valid till 04 Apr 2024
        </Typography>
      </Paper>
      <Typography
        variant='body1'
        fontSize={'1em'}
        color={darkTheme.palette.text.secondary}
        alignSelf={'flex-start'}
        marginBottom={'1em'}
      >
        Other Plans
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderRadius: '1em',
          color: darkTheme.palette.text.secondary,
          border: `1px solid ${darkTheme.palette.divider}`,
          marginBottom: '1.5em',
          padding: '1em',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={helloTuneClickHandler}
      >
        <Box>
          <Typography fontSize={'1em'} color={'#fff'}>
            Only Hellotunes
          </Typography>
          <Typography fontSize={'0.75em'}>
            {SUBSCRIPTIONDATA.map((item, i, arr) =>
              i != arr.length - 1 ? `${item.title} | ` : item.title
            )}
          </Typography>
        </Box>
        <Box>
          <Typography>Monthly</Typography>
          <Box display={'flex'}>
            <Typography sx={{ textDecoration: 'line-through' }}>₹35</Typography>
            <Typography fontSize={'1.5em'}>₹19</Typography>
          </Box>
        </Box>
        <CheckCircle
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor:
              selectedBox === 4
                ? 'rgb(235, 29, 34)'
                : darkTheme.palette.text.secondary,
            borderRadius: '50%',
          }}
        />
      </Paper>
      <Box component={'ul'} alignSelf={'flex-start'} marginBottom={'8em'}>
        <li key={crypto.randomUUID()}>All amounts are inclusive of 18% GST</li>
        <li key={crypto.randomUUID()}>
          By clicking on continue button, you agree to Wynk's{' '}
          <Link href='https://www.wynk.in/assets/webview/tos.html?coo=IN'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href='https://www.wynk.in/assets/webview/privacyPolicy.html?theme=dark&x-bsy-did=f02eb606d84ada66%2FAndroid%2F29%2F1036%2F3.52.1.0&coo=IN'>
            Privacy policy
          </Link>
          .
        </li>
        <li key={crypto.randomUUID()}>
          Get monthly hellotunes plan at ₹19. An auto-renewal plan, cancel
          anytime on app.
        </li>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        padding={'1em'}
        width={'60%'}
        position={'fixed'}
        bottom={'0'}
        sx={{ backgroundColor: darkTheme.palette.divider }}
      >
        <Box>
          <Typography color={darkTheme.palette.text.disabled}>
            Amount to be paid
          </Typography>
          <Typography>
            {selectedBox === 1 && '₹399'}
            {selectedBox === 2 && '₹129'}
            {selectedBox === 3 && '₹49'}
            {selectedBox === 4 && '₹19'}
          </Typography>
        </Box>
        <Button
          variant='contained'
          color={'info'}
          sx={{ padding: '1em 2em' }}
          onClick={clickHandler}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}

export default Subscription
