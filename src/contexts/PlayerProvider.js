import React, { createContext, useState } from 'react'

export const PlayerContext = createContext()

function PlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState([])
  const [track, setTrack] = useState(undefined)

  return (
    <PlayerContext.Provider value={{ playlist, setPlaylist, track, setTrack }}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
