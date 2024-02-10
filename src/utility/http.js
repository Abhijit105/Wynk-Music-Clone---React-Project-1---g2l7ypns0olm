import { useContext } from 'react'
import { BASEURL, BASEURL3, PROJECTID } from '../config/config'
import { AuthContext } from '../contexts/AuthProvider'

export const fetchData = async apiUrl => {
  const response = await fetch(apiUrl, {
    headers: { projectId: PROJECTID },
  })
  if (!response.ok) throw new Error('Something went wrong while fetching data.')
  const data = await response.json()
  return data
}

export const fetchFeaturedSongs = async (type, pageParam = 1) => {
  const response = await fetch(
    `${BASEURL}/song/?filter={"featured":"${type}"}&page=${pageParam}&limit=20"`,
    {
      headers: { projectId: PROJECTID },
    }
  )
  if (!response.ok)
    throw new Error('Something went wrong while fetching songs.')
  const data = await response.json()
  return data
}

export const fetchMoodSongs = async (type, pageParam = 1) => {
  const response = await fetch(
    `${BASEURL}/song/?filter={"mood":"${type}"}&page=${pageParam}&limit=20"`,
    {
      headers: { projectId: PROJECTID },
    }
  )
  if (!response.ok)
    throw new Error('Something went wrong while fetching songs.')
  const data = await response.json()
  return data
}

export const fetchSearchedSongs = async (searchTerm, pageParam = 1) => {
  const response = await fetch(
    `${BASEURL}/song?search={"title":"${searchTerm}"}&page=${pageParam}&limit=20`,
    {
      headers: { projectId: PROJECTID },
    }
  )

  if (!response.ok)
    throw new Error('Something went wrong while fetching songs.')
  const data = await response.json()
  return data
}

export const fetchSearchedAlbums = async (searchTerm, pageParam = 1) => {
  const response = await fetch(
    `${BASEURL}/album/?filter={"title":"${searchTerm}"}&page=${pageParam}&limit=20`,
    {
      headers: { projectId: PROJECTID },
    }
  )

  if (!response.ok)
    throw new Error('Something went wrong while fetching albums.')
  const data = await response.json()
  return data
}

export const fetchSearchedArtists = async (searchTerm, pageParam = 1) => {
  const response = await fetch(
    `${BASEURL}/artist?search={"title":"${searchTerm}"}&page=${pageParam}&limit=20`,
    {
      headers: { projectId: PROJECTID },
    }
  )

  if (!response.ok)
    throw new Error('Something went wrong while fetching artists.')
  const data = await response.json()
  return data
}
