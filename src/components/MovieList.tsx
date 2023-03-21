import { useState, useEffect } from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/splide/dist/css/splide.min.css'
import Popular from './Popular'
import Nav from './Nav'

const MovieList = () => {
    const [movies, setMovie] = useState([])

    const [search, setSearch] = useState("")

    const API_URL: string = 'http://www.omdbapi.com/?apikey=57108933'

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm)
        console.log("This is the one:", searchTerm)
    }


    // useEffect(() => {
    //     getPopular()
    // }, [])

    // const getPopular = async () => {
    //     const check = localStorage.getItem("popular")
    //     if (check) {
    //         setPopular(JSON.parse(check))
    //     } else {
    //         const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4387b35dd6f6aeab282d1700da0316c5`)

    //         const jsonData = await popularRes.json()
    //         const popularmovies = jsonData.results

    //         localStorage.setItem("popular", JSON.stringify(popularmovies))
    //         setPopular(popularmovies)
    //         console.log(popular[0])
    //     }
    // }

    // const getDetails = async () => {
    //     if (movieData?.media_type === "movie") {
    //         const sample = await fetch(`https://api.themoviedb.org/3/movie/${movieData?.id}`) 
    //     }
    // }

    const getMovies = async (title: string) => {
        try {
            // const response = await fetch(`${API_URL}&s=${title}`)
            // const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4387b35dd6f6aeab282d1700da0316c5&query=${title}`)
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&api_key=4387b35dd6f6aeab282d1700da0316c5`)
            const jsonData = await response.json()
            const movieRes = jsonData.results
            setMovie(movieRes)
            console.log("The Result:", movieRes)
            // return movies
        } catch (error) {
            console.error("Oh no Error", error)
        }
    }
    useEffect(() => {
        getMovies(search)
    }, [search])


    return (
        <div className="min-h-screen bg-[#04152d]">
            <Nav />
            <Search handleSearch={handleSearch} />
            {/* <Popular /> */}

            {search !== ""
                ? (
                    <div className='flex flex-wrap items-center justify-center w-75 sm:w-100 '>
                        <div className="w-full mx-2 my-2 px-5" >
                            <h1 className='font-bold text-5xl text-white text-center'>Movies Results</h1>
                        </div>
                        {movies.map((movie) => (
                            <div className="h-[560px] w-[310px] border-solid mx-2 my-2 " key={movie.id}>
                                <Link to={"/movie/" + movie.id}>
                                    <div className='flex flex-col text-slate-900 transition duration-500 hover:scale-105 relative group'>
                                        <img src={movie?.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${movie?.poster_path}` : "https://via.placeholder.com/310x465"} alt={movie.title} className='rounded-md opacity-90 hover:opacity-10 ' />
                                        <div className='absolute h-[100%] w-[100%] inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 text-4xl text-white'>
                                            <p className='text-4xl opacity-0 hover:opacity-100 text-white'>{movie.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[560px] w-full mx-2 my-2 px-5" >
                        <h1 className='font-bold text-5xl text-white text-center'>Search for Movies</h1>
                    </div>
                )}
        </div>
    )
}

export default MovieList
