import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../../custom.css'
import { RHAP_UI } from 'react-h5-audio-player'
import { PlaylistPlay } from '@mui/icons-material'
import React, { useContext, useEffect, useRef } from 'react'
import {
  Box,
  Paper,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { BASEURL } from '../../config/config'
import { darkTheme } from '../App'
import { AuthContext } from '../../contexts/AuthProvider'
import { PlayerContext } from '../../contexts/PlayerProvider'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '../../utility/http'

function AudioPlayerComponent() {
  const [album, setAlbum] = useState(null)
  const [displayLoader, setDisplayLoader] = useState(false)

  const { playlist, track, setTrack } = useContext(PlayerContext)

  const { webToken } = useContext(AuthContext)

  // const player = useRef()

  const handleEnd = function () {
    setTrack(track < playlist.length - 1 ? track + 1 : 0)
  }

  const clickNextHandler = function () {
    setTrack(track => (track !== playlist.length - 1 ? track + 1 : 0))
  }

  const clickPreviousHandler = function () {
    setTrack(track => (track !== 0 ? track - 1 : playlist.length - 1))
  }

  const loadStartHandler = function () {
    setDisplayLoader(true)
  }

  const loadedDataHandler = function () {
    setDisplayLoader(false)
  }

  const matchesMediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  const player = useRef()

  const { data, error, isLoading, isPending, isError } = useQuery({
    queryKey: ['Albums', playlist.at(track)?.album],
    queryFn: () =>
      fetchData(`${BASEURL}/album/${playlist.at(track)?.album || ''}`),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    setAlbum(data?.data)
  }, [data])

  useEffect(() => {
    player.current.audio.current.pause()
    player.current.forceUpdate()
  }, [webToken])

  // console.log('component rendered')
  // console.log(playlist)
  // console.log(track)
  // console.log(playlist.at(track))
  // console.log(playlist.at(track)?.album || '')
  // console.log(album)
  // console.log(webToken)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          position: 'fixed',
          zIndex: '2',
          bottom: '0',
          left: '0',
        }}
        className='audio-player-component'
      >
        <AudioPlayer
          customProgressBarSection={[
            RHAP_UI.PROGRESS_BAR,
            matchesMediumScreen && RHAP_UI.CURRENT_TIME,
            matchesMediumScreen && (
              <div className='rhap_time rhap_slash'>/</div>
            ),
            matchesMediumScreen && RHAP_UI.DURATION,
          ]}
          customControlsSection={[
            <Paper
              sx={{
                backgroundColor: '#272727',
                marginLeft: '1em',
                display: 'flex',
                gap: '0.75em',
                padding: '0.5em',
                borderRadius: '1em',
              }}
            >
              <Box
                component={'img'}
                src={playlist?.at(track)?.thumbnail}
                alt={playlist?.at(track)?.title}
                width='3em'
                borderRadius='0.5em'
              />
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
              >
                <Typography fontSize='1em'>
                  {isError ? error?.message : playlist?.at(track)?.title}
                </Typography>
                <Typography
                  fontSize='0.75em'
                  color={darkTheme.palette.text.secondary}
                >
                  {album?.title || ''}
                </Typography>
              </Box>
            </Paper>,
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            matchesMediumScreen && RHAP_UI.VOLUME_CONTROLS,
            // <IconButton
            //   style={{
            //     color: 'rgba(255, 255, 255, 0.7)',
            //     backgroundColor: '#272727',
            //     padding: '0 !important',
            //     cursor: 'pointer',
            //     border: 'none',
            //   }}
            // >
            //   <PlaylistPlay />
            // </IconButton>,
          ]}
          showSkipControls={matchesMediumScreen ? true : false}
          showJumpControls={false}
          showDownloadProgress
          autoPlay={false}
          src={webToken ? playlist?.at(track)?.audio_url : null}
          volume={0.8}
          onEnded={handleEnd}
          onClickNext={clickNextHandler}
          onClickPrevious={clickPreviousHandler}
          onLoadStart={loadStartHandler}
          onLoadedData={loadedDataHandler}
          ref={player}
        />
      </Box>
      {(displayLoader || isLoading || isPending) && (
        <span className='loader'></span>
      )}
    </>
  )
}

export default React.memo(AudioPlayerComponent)
