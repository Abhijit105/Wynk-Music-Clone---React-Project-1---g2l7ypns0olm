import React, { useState } from 'react'

function Test() {
  const [songs, setSongs] = useState([])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=100`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      console.log(data)
      const songs = data.data
      setSongs(songs)
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    page <= 10 && fetchData()
  }, [page])

  useEffect(() => {
    !isLoading && setPage(page => page + 1)
  }, [isLoading])

  console.log(page)
  console.log(allSongs)

  return <div>Test</div>
}

export default Test
