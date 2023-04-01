import { useState, useEffect } from 'react'
import Search from './Search'
import { Link, useParams } from 'react-router-dom'
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/splide/dist/css/splide.min.css'
// import Popular from './Popular'
import Nav from './Nav'

const MovieList = () => {
    const [movies, setMovie] = useState([])

    const { query } = useParams()
    const API_KEY = import.meta.env.VITE_TMBD_API_KEY

    const [search, setSearch] = useState(query)

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
    //         const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)

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
            // const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`)
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&api_key=${API_KEY}`)
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

            <div className="w-[100%] h-[450px] md:h-[700px] sm-py-[10px] flex align-center justify-center text-center relative ">
                <div className="opacity-layer"></div>
                <div className="flex flex-col align-center text-white relative max-w-[800px] mx-auto mt-[60px] px-[10px]">
                    <span className="text-5xl font-bold mb-10 md:text-8xl">Welcome.</span>
                    <span className="text-lg mb-40 md:text-2xl font-medium">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <Search handleSearch={handleSearch} />
                </div>
            </div>
            {/* <Popular /> */}

            {search !== ""
                ? (
                    <div className='flex flex-wrap items-center justify-center w-75 sm:w-100 '>
                        <div className="w-full mx-2 my-2 pb-5" >
                            <h1 className='font-bold text-5xl text-white text-center'>"Search Results for {query}"</h1>
                        </div>
                        {movies.map((movie) => (
                            <div className="h-[560px] w-[310px] border-solid mx-2 my-2 " key={movie.id}>
                                <Link to={movie.media_type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
                                    <div className='flex flex-col text-slate-900 transition duration-500 hover:scale-105 relative group'>
                                        <img
                                            src={movie?.poster_path !== null ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}` : "https://via.placeholder.com/310x465"}
                                            alt={movie.title}
                                            className='rounded-md opacity-90 hover:opacity-10 max-w-[100%] max-h-[100%]'
                                        />
                                        {/* {movie?.profile_path && <img src={movie?.profile_path !== null ? `https://image.tmdb.org/t/p/w300/${movie?.profile_path}` : "https://via.placeholder.com/310x465"} alt={movie.title} className='rounded-md opacity-90 hover:opacity-10 ' />} */}
                                        <div className='absolute h-[100%] w-[100%] inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 text-4xl text-white'>
                                            {movie.title && <p className='text-4xl opacity-0 hover:opacity-100 text-white'>{movie.title}</p>}
                                            {movie.name && <p className='text-4xl opacity-0 hover:opacity-100 text-white'>{movie.name}</p>}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[560px] w-full mx-2 my-2 px-5" >
                        <h1 className='font-bold text-5xl text-white text-center'>.</h1>
                    </div>
                )}
        </div>
    )
}

export default MovieList
