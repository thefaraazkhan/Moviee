import { useState, useEffect } from 'react'
import Search from './Search'
import MovieCard from "./MovieCard"

const MovieList = () => {
    const [movies, setMovie] = useState([])
    const [search, setSearch] = useState("")

    const API_URL: string = 'http://www.omdbapi.com/?apikey=57108933'

    const getSearch = async (searchTerm) => {
        console.log(searchTerm)
        // const searchedMovie = searchTerm
        // setSearch(searchedMovie)
        console.log(search)
        // await getMovies(search)
    }

    const getMovies = async (title: string) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`)
            const jsonData = await response.json()
            const movieRes = jsonData.Search
            setMovie(movieRes)
            console.log(movieRes)
            // return movies
        } catch {
            console.error("Oh no Error")
        }
    }

    // useEffect(() => {
    //     getMovies("Harry Potter")
    // }, [])

    return (
        <>
            <Search getSearch={getSearch} setSearch={setSearch} />

            {movies?.length > 0
                ? (
                    <div className='flex flex-wrap items-center justify-center w-75 sm:w-100 pl-5 px-6 mb-5 my-5'>
                        {movies.map((movie) => (
                            < MovieCard movie={movie} />
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
