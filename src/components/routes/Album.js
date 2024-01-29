import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Grid, useMediaQuery, Button } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import { useEffect } from 'react'
import { BASEURL } from '../../config/config'
import AlbumSongItem from '../common/AlbumSongItem'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { darkTheme } from '../App'
import { PlayArrow } from '@mui/icons-material'

function Album() {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [album, setAlbum] = useState(null)
  const [error, setError] = useState('')

  const { playlist, setPlaylist, setTrack } = useContext(PlayerContext)

  const { _id } = useParams()

  const navigate = useNavigate()

  const clickHandler = function () {
    setPlaylist(songItems)
    setTrack(0)
  }

  const artistClickHandler = function (artistId) {
    navigate(`/artists/${artistId}`)
  }

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASEURL}/album/${_id}`, {
        headers: { projectId: 'g2l7ypns0olm' },
      })
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      // console.log(data)
      const result = data.data
      setAlbum(result)
      const songsResult = data.data.songs
      setPlaylist(songsResult)
      const artistsResult = data.data.artists
      setArtists(artistsResult)
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (error) return

    fetchData()
  }, [])

  const songDisplayed = playlist.at(0)

  const slicedArtists = artists.slice(0, 4)

  // console.log(artists)
  // console.log(album)

  return (
    <Box
      padding={{ xs: '1.25em', sm: '2em', md: '4em', lg: '6em', xl: '6em' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        gap='2em'
        marginBottom='40px'
        alignItems='flex-start'
        width='100%'
      >
        <Box width={{ xs: '100%', md: '20%' }}>
          <Box
            component={'img'}
            src={songDisplayed?.thumbnail}
            alt={songDisplayed?.title}
            width={{ xs: '50%', md: '100%' }}
            borderRadius='1em'
            marginBottom='2em'
          />
          <Box
            display={{ xs: 'none', md: 'flex' }}
            flexDirection='column'
            gap='1em'
          >
            {artists.map(artist => (
              <Box
                display='flex'
                key={artist._id}
                alignItems='center'
                gap='1em'
                sx={{ cursor: 'pointer' }}
                onClick={() => artistClickHandler(artist._id)}
              >
                <Box
                  component={'img'}
                  src={artist.image}
                  alt={artist.name}
                  width='5em'
                  borderRadius='50%'
                />
                <Typography>{artist.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box flexGrow='1' display='flex' flexDirection='column' width={'100%'}>
          <Typography variant='h4' marginBottom='0.25emem'>
            {album?.title}
          </Typography>
          <Typography
            color={darkTheme.palette.text.secondary}
            marginBottom='1em'
          >
            Made by Abhijit105 | {playlist.length} songs
          </Typography>
          <Button
            variant='contained'
            sx={{
              alignSelf: 'flex-start',
              borderRadius: '100px',
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
              color: darkTheme.palette.text.primary,
              marginBottom: '1em',
            }}
            onClick={clickHandler}
          >
            <Box display={'flex'} alignItems={'center'}>
              <PlayArrow /> <Typography>Play Songs</Typography>
            </Box>
          </Button>
          {matchesMediumScreen && (
            <Grid
              container
              color='rgba(255, 255, 255, 0.7)'
              marginBottom='1em'
              flexGrow='1'
              justifyContent={'end'}
              flexWrap={'nowrap'}
            >
              <Grid
                item
                md={'auto'}
                marginRight='1em'
                key={crypto.randomUUID()}
              >
                <Typography>#</Typography>
              </Grid>
              <Grid item md={5} key={crypto.randomUUID()}>
                <Typography>Track</Typography>
              </Grid>
              <Grid item md={4} key={crypto.randomUUID()}>
                <Typography>Artists</Typography>
              </Grid>
              <Grid item md={3} key={crypto.randomUUID()}>
                <Typography>Album</Typography>
              </Grid>
              <Grid item md={'auto'} key={crypto.randomUUID()}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {!matchesMediumScreen && matchesExtraSmallScreen && (
            <Grid
              container
              color='rgba(255, 255, 255, 0.7)'
              marginBottom='1em'
              flexGrow='1'
              justifyContent={'end'}
              flexWrap={'nowrap'}
            >
              <Grid
                item
                xl={'auto'}
                marginRight='1em'
                key={crypto.randomUUID()}
              >
                <Typography>#</Typography>
              </Grid>
              <Grid item xs={12} key={crypto.randomUUID()}>
                <Typography>Track &</Typography>
                <Typography>Artists</Typography>
              </Grid>
              <Grid item xl={'auto'} key={crypto.randomUUID()}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {playlist.map((song, i) => (
            <AlbumSongItem
              key={song._id}
              item={song}
              albumName={album?.title}
              i={i}
              songItems={playlist}
              allArtists={artists}
              isLoading={isLoading}
            />
          ))}
        </Box>
      </Box>
      <Box
        marginBottom={'2em'}
        display={{ xs: 'flex', md: 'none' }}
        flexDirection='row'
        gap='1em'
        flexWrap={'wrap'}
      >
        {artists.map(artist => (
          <Box
            key={artist._id}
            display='flex'
            alignItems='center'
            gap='1em'
            sx={{ cursor: 'pointer' }}
            onClick={() => artistClickHandler(artist._id)}
          >
            <Box
              component={'img'}
              src={artist.image}
              alt={artist.name}
              width='5em'
              borderRadius='50%'
            />
            <Typography>{artist.name}</Typography>
          </Box>
        ))}
      </Box>
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default Album
