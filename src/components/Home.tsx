import { useEffect, useState } from 'react'
import Nav from './Nav'
// import MovieList from './MovieList'
import { Link } from 'react-router-dom'
import MovieList from './MovieList'
import Popular from './Popular'
import Search from './Search'

const Home = () => {
    const [background, setBackground] = useState("")
    const [movies, setMovie] = useState([])

    const [search, setSearch] = useState("")
    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm)
        console.log("This is the one:", searchTerm)
    }

    const getMovies = async () => {
        try {

            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4387b35dd6f6aeab282d1700da0316c5`)
            const jsonData = await response.json()
            const movieRes = jsonData
            console.log("The Result:", movieRes)
            setMovie(movieRes)
            const backdrop = movieRes?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
            console.log('backdrop', backdrop)
            const bg = `https://image.tmdb.org/t/p/original${backdrop}`
            console.log('bg', bg)
            setBackground(bg)
            // return movies
        } catch (error) {
            console.error("Oh no Error", error)
        }
    }

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
                    {/* <div className="flex align-center w-[100%]">
                        <input
                            type="text"
                            className='w-[calc(100%-100px)] h-[50px] bg-white border-0 outline-none rounded-[30px_0_0_30px] px-[15px] py-0 text-sm md:w-[calc(100%-150px)]'
                            placeholder="Search for a movie or tv show...."
                        // onChange={(e) => setQuery(e.target.value)}
                        // onKeyUp={searchQueryHandler}
                        />
                        <button className='w-[100px] h-[50px] bg-[#555555] text-white border-0 outline-0 rounded-[0_30px_30px_0] text-base cursor-pointer '>Search</button>
                    </div> */}
                    <Search handleSearch={handleSearch} />
                </div>
            </div>
            <div className='my-5 mx-10'>
                <h2 className='text-center text-xl font-bold bg-[#04152d] text-white mb-3'>
                    Popular Movies
                </h2>
                {/* <Link to="movielist/">
                    <button className='text-white rounded border-2 border-white p-2'>Movie List</button>
                </Link> */}
                <Popular />
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

