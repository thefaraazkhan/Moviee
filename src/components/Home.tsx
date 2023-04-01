import { useEffect, useState } from 'react'
import Nav from './Nav'
// import MovieList from './MovieList'
import { Link } from 'react-router-dom'
import MovieList from './MovieList'
import Popular from './Popular'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import Search from './Search'
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

const Home = () => {
    const [background, setBackground] = useState("")
    const [movies, setMovie] = useState([])
    const [searchedMovies, setSearchedMovies] = useState([])
    const [search, setSearch] = useState("")
    const handleSearch = (e, searchTerm: string) => {
        e.preventDefault()
        setSearch(searchTerm)
        console.log("This is the one:", searchTerm)
    }

    const API_KEY = import.meta.env.VITE_TMBD_API_KEY

    const getMovies = async () => {
        try {

            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            const jsonData = await response.json()
            const movieRes = jsonData
            // console.log("The Result:", movieRes)
            setMovie(movieRes)
            const backdrop = movieRes?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
            // console.log('backdrop', backdrop)
            const bg = `https://image.tmdb.org/t/p/original${backdrop}`
            // console.log('bg', bg)
            setBackground(bg)
            // return movies
        } catch (error) {
            console.error("Oh no Error", error)
        }
    }

    const getSeries = async () => {
        try {
            // const response = await fetch(`${API_URL}&s=${title}`)

            const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`)
            const jsonData = await response.json()
            const movieRes = jsonData.results
            setSearchedMovies(movieRes)
            console.log("The Result:", movieRes)
            // return movies
        } catch (error) {
            console.error("Oh no Error", error)
        }
    }

    useEffect(() => {
        const getSeriesRes = async () => {
            await getSeries()
        }
        getSeriesRes()
    }, [])

    useEffect(() => {
        const getMoviesRes = async () => {
            await getMovies()
        }
        getMoviesRes()
    }, [])

    return (
        <div className="min-h-screen bg-[#04152d]">
            <Nav />
            <div className="w-[100%] h-[450px] md:h-[700px] sm-py-[10px] flex align-center justify-center text-center relative ">
                <img
                    src={background}
                    className='w-[100%] h-[100%] absolute top-0 left-0 opacity-30 overflow-hidden object-cover object-center'
                    alt='main background' />
                <div className="opacity-layer"></div>
                <div className="flex flex-col align-center text-white relative max-w-[800px] mx-auto mt-[60px] px-[10px]">
                    <span className="text-5xl font-bold mb-10 md:text-8xl">Welcome.</span>
                    <span className="text-lg mb-40 md:text-2xl font-medium">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <form className="flex align-center w-[100%]" onSubmit={e => handleSearch(e, search)}>
                        <input
                            type="text"
                            className='w-[calc(100%-100px)] h-[50px] text-black bg-white border-0 outline-none rounded-[30px_0_0_30px] px-[15px] py-0 text-sm md:w-[calc(100%-150px)]'
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setSearch(e.target.value)}
                        // onKeyUp={searchQueryHandler}
                        />
                        <Link to={"/search/" + search}>
                            <button className='w-[100px] h-[50px] bg-[#555555] text-white border-0 outline-0 rounded-[0_30px_30px_0] text-base cursor-pointer '>Search</button>
                        </Link>
                    </form>
                    {/* <Search handleSearch={handleSearch} /> */}
                </div>
            </div>

            <div className='my-5 mx-10'>
                <h2 className='text-3xl font-bold bg-[#04152d] text-white mb-3 pb-4'>
                    Popular Movies
                </h2>
                {/* <Link to="movielist/">
                    <button className='text-white rounded border-2 border-white p-2'>Movie List</button>
                </Link> */}
                <Popular />
            </div>

            <div className='my-5 mx-10'>
                <h2 className='pb-4 text-3xl font-bold bg-[#04152d] text-white mb-3'>
                    Top Series
                </h2>
                {/* <Link to="movielist/">
                    <button className='text-white rounded border-2 border-white p-2'>Movie List</button>
                </Link> */}
                {
                    // <div className='flex flex-wrap items-center justify-center w-75 sm:w-100 '>
                    //     <div className="w-full mx-2 my-2 px-5" >
                    //         <h1 className='font-bold text-5xl text-white text-center'>Movies Results</h1>
                    //     </div>
                    //     {searchedMovies.map((movie) => (
                    //         <div className="h-[560px] w-[310px] border-solid mx-2 my-2 " key={movie.id}>
                    //             <Link to={movie.media_type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
                    //                 <div className='flex flex-col text-slate-900 transition duration-500 hover:scale-105 relative group'>
                    //                     <img src={movie?.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${movie?.poster_path}` : "https://via.placeholder.com/310x465"} alt={movie.title} className='rounded-md opacity-90 hover:opacity-10 ' />
                    //                     <div className='absolute h-[100%] w-[100%] inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 text-4xl text-white'>
                    //                         <p className='text-4xl opacity-0 hover:opacity-100 text-white'>{movie.title}</p>
                    //                     </div>
                    //                 </div>
                    //             </Link>
                    //         </div>
                    //     ))}
                    // </div>
                    <div
                        className='flex justify-center items-center text-center'
                    >
                        <Splide
                            className='flex justify-center items-center text-center'
                            options={{
                                perPage: 5,
                                arrows: true,
                                pagination: false,
                                drag: 'free',
                                gap: '3rem',
                                breakpoints: {
                                    640: {
                                        destroy: true,
                                    },
                                    1024: {
                                        perPage: 4,
                                    },
                                    1440: {
                                        perPage: 5,
                                    },
                                },
                            }}>
                            {searchedMovies.map(movie => {
                                return (
                                    <SplideSlide key={movie.id}>
                                        <Link to={movie.media_type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
                                            <div className='flex flex-col text-slate-900 transition duration-500 hover:scale-105 relative group mb-2'>
                                                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} className='rounded-md opacity-90 hover:opacity-10 ' />
                                                <div className='absolute h-[100%] w-[100%] inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 text-4xl text-white'>
                                                    <p className='text-4xl md:text-2xl opacity-0 hover:opacity-100 text-white'>{movie.title}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SplideSlide>
                                )
                            })}
                        </Splide>
                    </div>
                }
            </div>




            <div className="text-center text-xl font-bold bg-[#04152d] text-white inset-x-0 bottom-0 mb-1 p-5">

                <h2>
                    Moviee 2023
                </h2>
            </div>

        </div>
    )
}

export default Home

