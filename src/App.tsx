import './App.css'
import Nav from './components/Nav'

import MovieList from './components/MovieList'

function App() {
  return (
    <>
      <div className="min-h-screen bg-red-400">
        <Nav />
        <div className='my-5'>
          <MovieList />
        </div>
        <h2 className="text-center text-4xl font-bold text-blue-900">
          TailwindCSS + React
        </h2>
      </div>
    </>
  )
}

export default App
