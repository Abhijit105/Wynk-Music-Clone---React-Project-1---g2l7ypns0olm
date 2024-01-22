import React, { createContext, useState, useEffect } from 'react'

export const AllContext = createContext()

function AllProvider({ children, allSongs, searchTerm }) {
  const [allAlbums, setAllAlbums] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album?page=${page}&limit=100`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      if (!response.ok)
        throw new Error('Something went wrong while fetching songs for you.')
      const data = await response.json()
      console.log(data)
      const result = data.data
      setAllAlbums(allAlbums => [...allAlbums, ...result])
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    if (isLoading || allAlbums.length >= 400) return
    setPage(page => page + 1)
  }, [isLoading])

  console.log(page)
  console.log(allAlbums)

  const newSongs = allSongs.filter(
    song => song?.album && Number(song.dateOfRelease.slice(0, 4)) >= 2023
  )

  return (
    <AllContext.Provider value={{ allSongs, searchTerm, newSongs, allAlbums }}>
      {children}
    </AllContext.Provider>
  )
}

export default AllProvider
