import './App.css'
import { BrowserRouter } from "react-router-dom"
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import { Route, Routes, useLocation } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
