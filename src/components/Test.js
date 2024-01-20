import React, { useState, useEffect } from 'react'

function Test() {
  const [albums, setAlbums] = useState([])
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
      setAlbums(albums => [...albums, ...result])
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
    !isLoading && albums.length < 400 && setPage(page => page + 1)
  }, [isLoading])

  function mergeLanguage(x) {
    const L = new Set()
    for (let a in Object.keys(x.artists)) {
      for (let l in x.artists[a].languages) {
        L.add(x.artists[a].languages[l])
      }
    }

    return L
  }

  function filterLanguage(lang, x) {
    return x.has(lang)
  }

  const albumsTamil = albums.filter(row =>
    filterLanguage('tamil', mergeLanguage(row))
  )
  const albumsHindi = albums.filter(row =>
    filterLanguage('hindi', mergeLanguage(row))
  )
  const albumsEnglish = albums.filter(row =>
    filterLanguage('english', mergeLanguage(row))
  )
  const albumsTelugu = albums.filter(row =>
    filterLanguage('telugu', mergeLanguage(row))
  )
  const albumsBhojpuri = albums.filter(row =>
    filterLanguage('bhojpuri', mergeLanguage(row))
  )

  console.log(page)
  console.log(albums)
  console.log(albumsTamil)
  console.log(albumsHindi)
  console.log(albumsEnglish)
  console.log(albumsTelugu)
  console.log(albumsBhojpuri)

  return <div>Test</div>
}

export default Test
