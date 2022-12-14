import { useState, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import Footer from '~/components/footer'
import './App.css'

function App () {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        className="font-serif text-center px-4 py-10 text-gray-700 dark:text-gray-200"
      >
        { useRoutes(routes) }

        <Footer />
      </div>
    </Suspense>
  )
}

export default App
