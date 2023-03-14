import { useState, useEffect } from 'react'
import Search from './Search'
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
            {search === "" ? <div>Search a movie</div> :
                movies?.length > 0
                    ? (
                        <div className='flex flex-wrap items-center justify-center w-75 sm:w-100 '>
                            {movies.map((movie) => (
                                <div className="h-[560px] w-[310px] border-solid border-2 border-white-900 rounded-md	 mx-2 my-2 " key={movie.imdbID}>
                                    <Link to={"/movie/" + movie.imdbID}>
                                        {/* < MovieCard movie={movie} /> */}
                                        <img className="w-full h-[400px] object-contain" src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} alt="404" />
                                        <div className="px-6 py-4 h-50 w-50">
                                            <div className="font-bold text-xl mb-2 h-[90px]">{movie.Title}</div>
                                            <p className="text-gray-700 text-base">
                                                {movie.Year} - {movie.Type}
                                            </p>
                                        </div>
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
