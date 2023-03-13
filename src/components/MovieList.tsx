import { useState, useEffect } from 'react'
import Search from './Search'
import MovieCard from "./MovieCard"
import { Link } from 'react-router-dom'

const MovieList = () => {
    const [movies, setMovie] = useState([])
    const [search, setSearch] = useState("")

    const API_URL: string = 'http://www.omdbapi.com/?apikey=57108933'

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm)
        console.log("This is the one:", search)

    }

    const getMovies = async (title: string) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`)
            const jsonData = await response.json()
            const movieRes = jsonData.Search
            setMovie(movieRes)
            console.log("The Result:", movieRes)
            // return movies
        } catch {
            console.error("Oh no Error")
        }
    }
    useEffect(() => {
        getMovies(search)
    }, [search])


    return (
        <>
            <Search handleSearch={handleSearch} />
            {movies?.length > 0
                ? (
                    <div className='flex flex-wrap items-center justify-center w-75 sm:w-100 pl-5 px-6 mb-5 my-5'>
                        {movies.map((movie) => (
                            <div key={movie.imdbID}>
                                <Link to={"/movie/" + movie.imdbID}>
                                    < MovieCard movie={movie} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[560px] w-[310px] mx-2 my-2 px-5" >
                        <h1 className='font-bold text-xl'>No movies found</h1>
                    </div>
                )}
        </>
    )
}

export default MovieList
