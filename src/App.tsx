import './App.css'
import { BrowserRouter } from "react-router-dom"
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import { Route, Routes } from 'react-router-dom'
import SeriesDetails from './components/SeriesDetails'
import MovieList from './components/MovieList'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieID" element={<MovieDetails />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/tv/:seriesID" element={<SeriesDetails />} />
          <Route path="/search/:query" element={<MovieList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
