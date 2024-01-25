import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { useEffect } from 'react'
import { BASEURL } from '../../config/config'
import AlbumSongItem from '../common/AlbumSongItem'
import { PlayerContext } from '../../contexts/PlayerProvider'

function Album() {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [album, setAlbum] = useState(null)

  const { playlist, setPlaylist, setTrack } = useContext(PlayerContext)

  const { _id } = useParams()

  const navigate = useNavigate()

  const artistClickHandler = function (artistId) {
    navigate(`/artists/${artistId}`)
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASEURL}/album/${_id}`, {
        headers: { projectId: 'g2l7ypns0olm' },
      })
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      console.log(data)
      setAlbum(data.data)
      const songsResult = data.data.songs
      setPlaylist(songsResult)
      const artistsResult = data.data.artists
      setArtists(artistsResult)
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const songDisplayed = playlist.at(0)

  console.log(artists)
  console.log(album)

  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <Box
        display='flex'
        gap='2em'
        marginBottom='40px'
        alignItems='flex-start'
        width='100%'
      >
        <Box>
          <Box
            component={'img'}
            src={songDisplayed?.thumbnail}
            alt={songDisplayed?.title}
            maxWidth='280px'
            borderRadius='1em'
            marginBottom='2em'
          />
          <Box display='flex' flexDirection='column' gap='1em'>
            {artists.map(artist => (
              <Box
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
                  borderRadius='100%'
                />
                <Typography>{artist.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box flexGrow='1' display='flex' flexDirection='column'>
          <Typography variant='h4' marginBottom='1em'>
            {album?.title}
          </Typography>
          <Grid
            container
            color='rgba(255, 255, 255, 0.7)'
            marginBottom='1em'
            flexGrow='1'
          >
            <Grid xl={'auto'} marginRight='1em'>
              <Typography>#</Typography>
            </Grid>
            <Grid xl={5}>
              <Typography>Track</Typography>
            </Grid>
            <Grid xl={3}>
              <Typography>Artists</Typography>
            </Grid>
            <Grid xl={3}>
              <Typography>Album</Typography>
            </Grid>
            <Grid xl={1}>
              <Typography>&nbsp;</Typography>
            </Grid>
          </Grid>
          {playlist.map((song, i) => (
            <AlbumSongItem
              key={i}
              item={song}
              albumName={album?.title}
              i={i}
              onPlaylistUpdate={setPlaylist}
              onTrackUpdate={setTrack}
              songItems={playlist}
              allArtists={artists}
            />
          ))}
        </Box>
      </Box>
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default Album
