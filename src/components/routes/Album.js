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
import { AuthContext } from '../../contexts/AuthProvider'
import ArtistsModal from '../ArtistsModal'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '../../utility/http'

function Album() {
  const [artists, setArtists] = useState([])
  const [album, setAlbum] = useState(null)
  const [songs, setSongs] = useState([])
  const [isLoadingImageAlbum, setIsLoadingImageAlbum] = useState(true)
  const [isLoadingImageArtist, setIsLoadingImageArtist] = useState(true)
  const [openArtistsModal, setOpenArtistsModal] = React.useState(false)

  const { playlist, setPlaylist, setTrack } = useContext(PlayerContext)

  const { _id } = useParams()

  const navigate = useNavigate()

  const { webToken } = useContext(AuthContext)

  const loadHandlerAlbum = function () {
    setIsLoadingImageAlbum(false)
  }

  const loadHandlerArtist = function () {
    setIsLoadingImageArtist(false)
  }

  const playSongsClickHandler = function () {
    setPlaylist(songs)
    setTrack(0)
  }

  const artistClickHandler = function (artistId) {
    navigate(`/artists/${artistId}`)
  }

  const handleOpenArtistsModal = event => {
    event.preventDefault()
    setOpenArtistsModal(true)
  }

  const handleCloseArtistsModal = () => {
    setOpenArtistsModal(false)
  }

  const seeAllArtistsHandler = function (event) {
    handleOpenArtistsModal(event)
  }

  const matchesExtraSmallScreen = useMediaQuery(theme =>
    theme.breakpoints.up('xs')
  )
  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  const {
    data: dataAlbum,
    isPending: isPendingAlbum,
    isLoading: isLoadingAlbum,
    isError: isErrorAlbum,
    error: errorAlbum,
  } = useQuery({
    queryKey: ['Album', _id],
    queryFn: () => fetchData(`${BASEURL}/album/${_id}`),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    if (!dataAlbum) return

    setAlbum(dataAlbum.data)
    setSongs(dataAlbum.data.songs)
    setArtists(dataAlbum.data.artists)
  }, [dataAlbum])

  // console.log(artists)
  // console.log(dataAlbum)
  // console.log(album)
  // console.log(_id)

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
        <Box width={{ xs: '50%', md: '20%' }} flexShrink={'0'} flexGrow='1'>
          <Box
            display={'flex'}
            width={'100%'}
            height={'100%'}
            position={'relative'}
            marginBottom='2em'
          >
            <Box
              component={'img'}
              src={album?.image}
              alt={album?.title}
              width={'100%'}
              borderRadius='1em'
              onLoad={loadHandlerAlbum}
            />
            {(isLoadingImageAlbum || isLoadingAlbum) && (
              <Box
                width={'100%'}
                height={'100%'}
                position={'absolute'}
                borderRadius={'1em'}
                overflow={'hidden'}
              >
                <span
                  className='loader'
                  style={{ position: 'absolute' }}
                ></span>
              </Box>
            )}
          </Box>
          <Box
            display={{ xs: 'none', md: 'flex' }}
            flexDirection='column'
            gap='1em'
          >
            <Typography fontSize={'1.5em'}>Featured Artists</Typography>
            {artists.slice(0, 4).map(artist => (
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
                  onLoad={loadHandlerArtist}
                />
                {(isLoadingImageArtist || isLoadingAlbum) && (
                  <span
                    className='loader-artist'
                    style={{ position: 'absolute' }}
                  ></span>
                )}
                <Typography>{artist.name}</Typography>
              </Box>
            ))}
            {artists.length > 4 && (
              <Button
                onClick={event => seeAllArtistsHandler(event)}
                variant='outlined'
                color='inherit'
                sx={{
                  textTransform: 'capitalize',
                  alignSelf: 'center',
                  borderRadius: '100px',
                }}
              >
                See All Artists
              </Button>
            )}
          </Box>
        </Box>
        <Box flexGrow='1' display='flex' flexDirection='column' width={'100%'}>
          <Typography variant='h4' marginBottom='0.25em'>
            {album?.title}
          </Typography>
          <Typography
            color={darkTheme.palette.text.secondary}
            marginBottom='1em'
          >
            Made by Abhijit105 | {songs.length} songs
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
            onClick={playSongsClickHandler}
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
                <Typography>Track & Artists</Typography>
              </Grid>
              <Grid item xl={'auto'} key={crypto.randomUUID()}>
                <Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Grid>
            </Grid>
          )}
          {songs.map((song, i) => (
            <AlbumSongItem
              key={song._id}
              item={song}
              albumName={album?.title}
              i={i}
              songItems={songs}
              allArtists={artists}
              isLoading={isLoadingAlbum || isPendingAlbum}
            />
          ))}
        </Box>
      </Box>
      <Box
        display={{ xs: 'flex', md: 'none' }}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Typography fontSize={'1.5em'}>Artists</Typography>
        {artists.length > 4 && (
          <Button
            onClick={event => seeAllArtistsHandler(event)}
            variant='outlined'
            color='inherit'
            sx={{
              textTransform: 'capitalize',
              alignSelf: 'center',
              borderRadius: '100px',
            }}
          >
            See All Artists
          </Button>
        )}
      </Box>
      <Box
        marginBottom={'2em'}
        width={'100%'}
        display={{ xs: 'flex', md: 'none' }}
        flexDirection='row'
        gap='1em'
        flexWrap={'wrap'}
      >
        {artists.slice(0, 4).map(artist => (
          <Box
            key={artist._id}
            display='flex'
            flexDirection={'column'}
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
              onLoad={loadHandlerArtist}
            />
            {(isLoadingImageArtist || isLoadingAlbum) && (
              <span
                className='loader-artist'
                style={{ position: 'absolute' }}
              ></span>
            )}
            <Typography>{artist.name}</Typography>
          </Box>
        ))}
      </Box>
      {!webToken && <LoginRecommendation />}
      <BestWay />
      <ArtistsModal
        open={openArtistsModal}
        handleClose={handleCloseArtistsModal}
        artistItems={artists}
        isLoadingData={isLoadingAlbum}
      />
    </Box>
  )
}

export default Album
