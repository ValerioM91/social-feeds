import React from 'react'
import App from './App'
import { SocialFeedProvider } from './context/SocialFeed'
import { FilterProvider } from './context/FilterContext'
import { createRoot } from 'react-dom/client'

const AppContainer = () => {
  return (
    <SocialFeedProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </SocialFeedProvider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<AppContainer />)
