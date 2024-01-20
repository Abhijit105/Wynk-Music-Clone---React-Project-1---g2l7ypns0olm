import { FileDownload } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import LoginRecommendation from './common/LoginRecommendation'

function Trending() {
  const [trendingSongs, setTrendingSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Trending songs"}&page=${page}&limit=20`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      console.log(response)
      if (!response.ok) {
        setError('Something went wrong while fetching songs for you.')
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      console.log(data)
      const songs = data.data
      setTrendingSongs(trendingSongs => [...trendingSongs, ...songs])
    } catch (err) {
      console.log(err)
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (error) return
    fetchData()
  }, [page])

  const songDisplayed = trendingSongs[0]

  console.log(trendingSongs)
  console.log(page)

  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Box display='flex' gap='2em' marginBottom='40px'>
        <Box
          component={'img'}
          src={songDisplayed?.thumbnail}
          alt={songDisplayed?.title}
          maxWidth='280px'
          borderRadius='1em'
        />
        <Box sx={{ flexGrow: '1' }}>
          <Typography variant='h4'>Trending Songs</Typography>
          <Grid container>
            <Grid xl={1}>
              <Typography>#</Typography>
            </Grid>
            <Grid xl={4}>
              <Typography>Track</Typography>
            </Grid>
            <Grid xl={2}>
              <Typography>Artists</Typography>
            </Grid>
            <Grid xl={2}>
              <Typography>Album</Typography>
            </Grid>
            <Grid xl={2}>
              <Typography>Duration</Typography>
            </Grid>
            <Grid xl={1}>
              <Typography>&nbsp;</Typography>
            </Grid>
          </Grid>
          {trendingSongs.map((song, i) => (
            <Grid container>
              <Grid xl={1}>
                <Typography>{i + 1}</Typography>
              </Grid>
              <Grid xl={4}>
                <Typography>{song.title}</Typography>
              </Grid>
              <Grid xl={2}>
                <Typography>
                  {song.artist.map(a => a.name).join(', ')}
                </Typography>
              </Grid>
              <Grid xl={2}>
                <Typography>{song?.album}</Typography>
              </Grid>
              <Grid xl={2}>
                <Typography>{song.audio_url.duration}</Typography>
              </Grid>
              <Grid xl={1}>
                <Box component={'a'} download={true} href={song.audio_url}>
                  <FileDownload />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
      {trendingSongs.length !== 30 && (
        <Button
          variant='outlined'
          sx={{
            color: 'inherit',
            borderRadius: '100px',
            borderColor: 'inherit',
          }}
          onClick={() => setPage(page => page + 1)}
        >
          Show More
        </Button>
      )}
      <LoginRecommendation />
    </Box>
  )
}

export default Trending
