import React, { createContext } from 'react'

export const AllSongsContext = createContext()

function AllSongsProvider({ children, allSongs }) {
  return (
    <AllSongsContext.Provider value={{ allSongs }}>
      {children}
    </AllSongsContext.Provider>
  )
}

export default AllSongsProvider
