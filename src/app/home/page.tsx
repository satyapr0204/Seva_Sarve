import React from 'react'
import ClientComponent from './ClientComponent'

const Homepage = () => {
  return (
    // <div>Homepage</div>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
          <ClientComponent />
        </div>
  )
}

export default Homepage